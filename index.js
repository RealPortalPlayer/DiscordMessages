const {readFileSync, writeFileSync} = require("fs")

console.log("Parsing server index")

const serverIndex = JSON.parse(readFileSync("package/messages/index.json").toString())

let html = ""

for (const id of Object.keys(serverIndex))
    html += `<a href="/${id}.html">${serverIndex[id]} ({${id})</a><br>`

writeFileSync("parsed/index.html", html)