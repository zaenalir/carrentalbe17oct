//core module
const os = require("os");
const fs = require("fs");
//local module
const luasSegitiga = require("./luasSegitiga.js");

// membuat file menggunakan module fs
fs.writeFileSync("text.txt", "鸣人魔刊", "utf-16le");

// membaca file menggunakan module fs
const data = fs.readFileSync("text.txt", "utf-16le");
console.log(data);

console.log("Hello")
console.log(os.hostname())
console.log(luasSegitiga(2, 3))
