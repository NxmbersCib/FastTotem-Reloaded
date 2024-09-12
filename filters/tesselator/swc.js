import { transformFile } from "@swc/core";
import { sync } from "glob";
import { mkdirSync, readFileSync, writeFileSync, unlinkSync } from "fs";
import { join, relative, dirname } from "path";
import JSON5 from "json5";

const plugindata = JSON5.parse(readFileSync("../../src/main/resources/teseract.plugin.json"))

const tsconfig = JSON5.parse(readFileSync("../../tsconfig.json"));

const package_name = plugindata.id;
const version = plugindata.version;

const initialMS = Date.now();
console.log(`Started building ${package_name}@${version}!`);

const indexcode = `
import Teseract from "./@teseract/server-api/src/Teseract";
${(() => {
        let str = ``
        for (const entryPoint in plugindata.entrypoints) {
            const pointData = plugindata.entrypoints[entryPoint]
            for (const point in pointData) {
                console.log(point, pointData)
                str += `import ${point} from "${pointData[point].replace(/\.ts$|\.js$/, '')}";` + `\nTeseract.registerPlugin(new ${point}(), "${point}");\n`
            }
        }
        return str;
    })()}
`
mkdirSync("BP/scripts")
writeFileSync("BP/scripts/index.js", indexcode)

const files = sync("./data/**/*.{ts,js}");

Promise.all(
    files.map((file) =>
        transformFile(file, {
            jsc: {
                parser: {
                    syntax: "typescript",
                    tsx: false,
                    decorators: true,
                },
                transform: {
                    legacyDecorator: true,
                    decoratorMetadata: true,
                },
                "paths": tsconfig.compilerOptions.paths ?? {},
                target: "es2020",
                "baseUrl": "data"
            },

            sourceMaps: false,
            module: {
                type: "es6",
            },
        })
            .then((output) => {
                const outPath = join("BP/scripts", relative("data", file));
                const outDir = dirname(outPath);
                mkdirSync(outDir, { recursive: true });
                console.log(outDir)
                writeFileSync(outPath.replace(/\.ts$/, ".js"), output.code);
                if (output.map) {
                    writeFileSync(outPath.replace(/\.ts$/, ".js.map"), output.map);
                }
            })
    )
)
    .then(() => {
        console.log(`Building finished in ${Date.now() - initialMS} milliseconds!`);
    })
    .catch((error) => {
        console.error(error);
    });

