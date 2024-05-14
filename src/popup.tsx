import { Storage } from "@plasmohq/storage"

import { Button } from "~components/ui/button"

import "~style.css"

import Logo from "data-base64:~assets/icon.svg"
import React, { useEffect, useState } from "react"

import ConnectionCard from "~components/connection-card"
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
          <ConnectionCard apiKey={apiKey}></ConnectionCard>
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
      <div className="plasmo-w-[400px] plasmo-h-[500px] plasmo-bg-black plasmo-flex plasmo-flex-col">
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
