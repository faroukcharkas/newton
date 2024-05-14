# Newton Chrome Extension

## Overview

Newton is a Chrome Extension that allows users to discreetly run Claude Opus from Anthropic using their own API key. This extension is designed to provide quick and accurate answers to questions selected by the user directly from their browser.

## Features

- **API Key Connection**: Securely connect your Anthropic API key through the extension's popup interface.
- **Discreet Usage**: Use Claude Opus to generate answers without leaving your browser.
- **Clipboard Integration**: Automatically copies generated answers to your clipboard for easy use.

## Installation

1. Clone this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable Developer Mode by toggling the switch in the top right corner.
4. Click on "Load unpacked" and select the directory where you cloned this repository.

## Usage

1. Click on the Newton icon in your Chrome toolbar to open the popup.
2. If you haven't already, enter your Anthropic API key and click "Connect".
3. Highlight text on any webpage, right-click, and select "Ask Newton" from the context menu.
4. The answer will be generated and copied to your clipboard, indicated by a notification.

## Configuration

- **API Key Management**: Manage your API key through the popup interface. You can connect a new key or disconnect an existing key at any time.

## Dependencies

- `@anthropic-ai/sdk`: SDK for interacting with Anthropic's Claude Opus.
- `@plasmohq/storage`: Used for securely storing and retrieving the API key.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your proposed changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
