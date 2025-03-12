'use strict';

const fs = require("fs");
const escodegen = require("escodegen");
const parser = require("./parser");

if (process.argv.length !== 3) {
    console.log(`usage: ${process.argv[0]} ${process.argv[1]} src`);
    process.exit(1);
}
const path = process.argv[2];
fs.readFile(path, { encoding: "utf-8", flag: "r" }, (err, data) => {
    const est = parser.parse(data);
    console.log("=====ESTree=====");
    console.log(JSON.stringify(est, null, 2));
    const src = escodegen.generate(est);
    console.log("=====JS=====");
    console.log(src);
    fs.writeFileSync("./src.js", src, "utf-8");
});