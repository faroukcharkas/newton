export {}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  navigator.clipboard.writeText(request.copy)
})
