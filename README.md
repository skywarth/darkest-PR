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

## Design

### Patterns

Applied and active:
- Repository pattern
- Strategy pattern
- Singleton pattern
- Facade pattern

Could be applied, would be decent in future expansion:
- Factory or Abstract factory pattern, for strategies 

## Use-case analysis

- [X] PR opened
  - Fresh PR
  - Re-open of PR after previous one gets cancelled
  - Re-open of PR after previous one gets approved and merged
- [X] PR closed
  - [X] No merge
    - No discussion/review
    - Short discussion/review
    - Long discussion/review
    - Closed previously as well
  - [X] Merge
    - No discussion/review
    - Short discussion/review
    - Long discussion/review
- [X] PR Review
  - Approved
  - Rejected (change request)
  - Just comment
- [ ] Issue
  - Reviewer/assignee
    - Added
    - Removed
- [ ] PR
  - Reviewer/assignee
    - [ ] Added
    - [ ] Removed
- [X] Issue/PR comment
  - Tagging the bot
    - [X] No input package param provided
    - [X] Input package param provided
    - [X] Partial input package param provided
- [ ] [CRUCIBLE] Context aware dynamic quotes
  - Replacing pronouns with respective usernames
    - By parameter
    - By context
- [ ] Refactor comment create action

## Tagging Input 

### Sample

Sample comment below, between the separation lines

---

Hey ancestor @Darkest-PR, give me a cool line!

```json
{
  "identifier":"Darkest-PR-input-package",
  "sentiment": "Negative",
  "emotionMetrics": [
    {
      "emotion": "Frustration",
      "temperature": 4
    },
    {
      "emotion": "Fury",
      "temperature": 5
    },
    {
      "emotion": "Wrath",
      "temperature": 3
    }
  ],
  "tags": [
    "destroyed",
    "obliterated",
    "victory"
  ]
}

```

---



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
- https://octokit.github.io/rest.js/v20#pulls

### Blunder of imports

Node.js refuses to allow extensionless imports, e.g: `import {QuoteFacade} from "./QuoteFacade";`

Therefor you have to add `.js` extension to each import. Which is looking very dumb to do in typescript

- https://stackoverflow.com/questions/75807785/why-do-i-need-to-include-js-extension-in-typescript-import-for-custom-module
- https://stackoverflow.com/questions/72491392/when-do-we-need-to-add-file-extension-when-importing-javascript-modules

Ridiculous.