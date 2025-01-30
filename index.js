// Copyright (c) 2025, PortalPlayer <email@portalplayer.xyz>
// Licensed under MIT <https://opensource.org/licenses/MIT>

const {readFileSync, writeFileSync, readdirSync} = require("fs")

console.log("Reading server index")

const serverIndex = JSON.parse(readFileSync("package/messages/index.json").toString())

let html = ""

console.log("Parsing messages")

const messages = readdirSync("package/messages")
const parsedMessages = {}

for (const id of messages) {
    if (!id.startsWith("c"))
        continue

    const parsedId = id.substring(1)

    console.log(`Doing: ${serverIndex[parsedId]} (${parsedId})`)

    parsedMessages[parsedId] = JSON.parse(readFileSync(`package/messages/${id}/messages.json`).toString())

    for (const message of parsedMessages[parsedId])
        html += `[${message.ID} @ ${message.Timestamp}]: ${message.Contents}<br>` // TODO: attachments?

    writeFileSync(`parsed/${parsedId}.html`, html)

    html = ""
}

html = ""

console.log("Parsing server index")

for (const id of Object.keys(serverIndex))
    html += `<a href="${id}.html">${id} with ${parsedMessages[id].length} messages: ${serverIndex[id]}</a><br>`

writeFileSync("parsed/index.html", html)