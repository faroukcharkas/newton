import Anthropic from "@anthropic-ai/sdk"

import { Storage } from "@plasmohq/storage"

const store = new Storage()

export {}

async function writeToClipboard(text) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { copy: text })
  })
}

async function generateAnswer(question, tab) {
  // Pull API key
  let key = await store.get("apiKey")

  console.log(`Pulled API key: ${key}`)

  console.log(`Got question: ${question}`)

  // Initialize Anthropic model
  const anthropic = new Anthropic({
    apiKey: key
  })

  let startTime = Date.now()
  let timerInterval = setInterval(() => {
    let currentTime = Date.now()
    let delta = startTime - currentTime
    // Convert delta milliseconds to string representation "5s" or "1m 3s"
    let seconds = Math.abs(delta / 1000)
    let minutes = Math.floor(seconds / 60)
    seconds = seconds % 60
    let timeString = `${minutes > 0 ? `${minutes}m ` : ""}${seconds}s`
    writeToClipboard(`Generating answer... ${timeString}`)
  }, 1000)

  console.log(`Generating...`)

  const answer = await anthropic.messages
    .create({
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are a test-solver bot. Your work will be graded by a college professor, so it must be accurate, in-depth, and detailed. Solve this test question: ${question}`
        }
      ],
      model: "claude-3-opus-20240229"
    })
    .catch(async (error) => {
      if (error instanceof Anthropic.APIError) {
        clearInterval(timerInterval)
        await writeToClipboard(`API Error -- ${error.status} ${error.name}`)
      } else {
        clearInterval(timerInterval)
        await writeToClipboard(`Error -- ${error.toString()}`)
      }
      return null
    })

  if (answer !== null) {
    clearInterval(timerInterval)
    await writeToClipboard(answer.content[0].text)
  }
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: "Ask Newton",
    contexts: ["selection"],
    id: "newtonMenu"
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  generateAnswer(info.selectionText, tab)
})

// TODO: Do a keystroke
// chrome.commands.onCommand.addListener((command, tab) => {
//   console.log(`Caught a command: ${command}`)
//   if (command === "generate-answer") {
//     let question = prompt("What's the question?")
//     generateAnswer(question, tab)
//   }
// })
