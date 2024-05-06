import { Storage } from "@plasmohq/storage"

import { Button } from "~components/ui/button"

// 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

import "~style.css"

import Logo from "data-base64:~assets/icon.svg"
import React, { useEffect, useState } from "react"

import { Input } from "~components/ui/input"

const store = new Storage()

function IndexPopup() {
  const [apiKey, setApiKey] = useState("")
  const [apiKeyInput, setApiKeyInput] = useState("")

  useEffect(() => {
    async function fetchKeyFromStorage() {
      let key = await store.get("apiKey")
      setApiKey(key)
    }
    fetchKeyFromStorage()
  }, [])

  function renderState() {
    if (apiKey !== "") {
      return (
        <React.Fragment>
          <div className="plasmo-w-full plasmo-bg-green-800 plasmo-border plasmo-border-green-500 plasmo-rounded-lg plasmo-p-4 plasmo-text-sm plasmo-flex-col plasmo-items-center">
            <div className="plasmo-flex plasmo-items-center plasmo-gap-2">
              <span className="plasmo-relative plasmo-flex plasmo-h-3 plasmo-w-3">
                <span className="plasmo-animate-ping plasmo-absolute plasmo-inline-flex plasmo-h-3 plasmo-w-3 plasmo-rounded-full plasmo-bg-green-300 plasmo-opacity-75"></span>
                <span className="plasmo-relative plasmo-inline-flex plasmo-rounded-full plasmo-h-3 plasmo-w-3 plasmo-bg-green-300"></span>
              </span>
              API is Connected
            </div>
            <Input
              disabled
              autoCorrect="off"
              autoCapitalize="off"
              className="plasmo-mt-4 plasmo-overflow-ellipsis"
              value={apiKey}></Input>
          </div>
          <p className="plasmo-text-muted-foreground plasmo-text-xs plasmo-w-full plasmo-text-center plasmo-mt-2">
            Make sure that your API key is valid, as we do not check.
          </p>
          <div className="plasmo-flex-1"></div>
          <Button
            className="plasmo-w-full"
            onClick={async () => {
              await store.set("apiKey", "")
              await setApiKey("")
            }}>
            Disconnect Key
          </Button>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <h1 className="plasmo-text-2xl">Connect API Key</h1>
          <p className="plasmo-text-md plasmo-text-muted-foreground plasmo-mb-6">
            Newton uses Anthropic's Claude Opus.
          </p>
          <Input
            placeholder="Enter key here"
            autoCorrect="off"
            autoCapitalize="off"
            value={apiKeyInput}
            onChange={async (e) => await setApiKeyInput(e.target.value)}
            className="plasmo-mb-4"></Input>
          <Button
            className="plasmo-w-full"
            onClick={async () => {
              await store.set("apiKey", apiKeyInput)
              await setApiKey(apiKeyInput)
            }}>
            Connect
          </Button>
        </React.Fragment>
      )
    }
  }

  return (
    <div className="plasmo-dark">
      <div className="plasmo-w-[300px] plasmo-h-[400px] plasmo-bg-black plasmo-flex plasmo-flex-col">
        <div className="plasmo-w-full plasmo-h-[60px] plasmo-flex plasmo-justify-center plasmo-items-center plasmo-border-b plasmo-px-8">
          <img src={Logo} className="plasmo-max-h-[40px]" />
        </div>
        <div className="plasmo-flex-1 plasmo-flex plasmo-flex-col plasmo-justify-start plasmo-items-center plasmo-p-8">
          {renderState()}
        </div>
      </div>
    </div>
  )
}

export default IndexPopup
