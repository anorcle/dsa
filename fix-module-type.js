import fs from 'fs'

const mjsPath = JSON.parse(fs.readFileSync('./tsconfig-mjs.json')).compilerOptions.outDir;
const cjsPath = JSON.parse(fs.readFileSync('./tsconfig-cjs.json')).compilerOptions.outDir;

const mjs = {
    type: "module"
}

const cjs = {
    type: "commonjs"
}

fs.writeFileSync(`${mjsPath}/package.json`, JSON.stringify(mjs, null, 4));
fs.writeFileSync(`${cjsPath}/package.json`, JSON.stringify(cjs, null, 4));