const {readFileSync, writeFileSync, readdirSync} = require("fs")

console.log("Parsing server index")

const serverIndex = JSON.parse(readFileSync("package/messages/index.json").toString())

let html = ""

for (const id of Object.keys(serverIndex))
    html += `<a href="${id}.html">${serverIndex[id]} (${id})</a><br>`

writeFileSync("parsed/index.html", html)

html = ""

console.log("Parsing messages")

const messages = readdirSync("package/messages")

for (const id of messages) {
    if (!id.startsWith("c"))
        continue

    const parsedId = id.substring(1)

    console.log(`Doing: ${serverIndex[parsedId]} (${parsedId})`)

    const messages = JSON.parse(readFileSync(`package/messages/${id}/messages.json`).toString())

    for (const message of messages)
        html += `[${message.ID} @ ${message.Timestamp}]: ${message.Contents}<br>` // TODO: attachments?

    writeFileSync(`parsed/${parsedId}.html`, html)

    html = ""
}