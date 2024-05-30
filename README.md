# darkest-PR


## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t darkest-PR .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> darkest-PR
```

## Roadmap

- Including voice lines as sound file to comments


## Notes to self

### Smee.io

Smee.io is a free service for relaying local webhooks to internet.

"Receives payloads then sends them to your locally running application."

It has a client (your localhost) library for the target, available in node.js

Probot basically runs this in the background (when you?) start the app in local

- I suppose `WEBHOOK_PROXY_URL` is to be change when you deploy, I mean why would it use Smee if not in local?


### Event/action types

- https://github.com/octokit/webhooks.js/#webhook-events
- https://docs.github.com/en/webhooks/webhook-events-and-payloads#issues

### Blunder of imports

Node.js refuses to allow extensionless imports, e.g: `import {QuoteFacade} from "./QuoteFacade";`

Therefor you have to add `.js` extension to each import. Which is looking very dumb to do in typescript

- https://stackoverflow.com/questions/75807785/why-do-i-need-to-include-js-extension-in-typescript-import-for-custom-module
- https://stackoverflow.com/questions/72491392/when-do-we-need-to-add-file-extension-when-importing-javascript-modules

Ridiculous.