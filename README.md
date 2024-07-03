# darkest-PR

[![codecov](https://codecov.io/gh/skywarth/darkest-PR/graph/badge.svg?token=Z86VA7I4HH)](https://codecov.io/gh/skywarth/darkest-PR)

[![Known Vulnerabilities](https://snyk.io/test/github/skywarth/darkest-PR/badge.svg)](https://snyk.io/test/github/skywarth/darkest-PR) 

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=skywarth_darkest-PR)](https://sonarcloud.io/summary/new_code?id=skywarth_darkest-PR)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=skywarth_darkest-PR&metric=bugs)](https://sonarcloud.io/summary/new_code?id=skywarth_darkest-PR)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=skywarth_darkest-PR&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=skywarth_darkest-PR)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=skywarth_darkest-PR&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=skywarth_darkest-PR)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=skywarth_darkest-PR&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=skywarth_darkest-PR)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=skywarth_darkest-PR&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=skywarth_darkest-PR)


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
- Chain of Responsibility pattern
  - I'll admit it's a bit forced, just wanted to implement it for the purpose of practice
- Factory pattern 

Could be applied, would be decent in future expansion:
- Factory or Abstract factory pattern, for strategies 

## Use-case analysis




- [X] Issue
  - [X] Assignee
    - [X] Added
    - [X] Removed
- [X] PR
  - [X] Reviewer
    - [X] Added
    - [X] Removed
  - [X] Assignee
    - [X] Added
    - [X] Removed 
  - [X] PR opened
    - [X] Fresh PR
    - [X] Re-open of PR after previous one gets cancelled
    - [X] Re-open of PR after previous one gets approved and merged
    - [ ] Includes: merge conflict
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

- [X] Issue/PR comment
  - Tagging the bot
    - [X] No input package param provided
    - [X] Input package param provided
    - [X] Partial input package param provided

- [ ] Release


## Tagging Input 

### Sample

Sample comment below, between the separation lines

---

Hey ancestor @Darkest-PR, give me a cool line!

```json
{
  "identifier":"Darkest-PR-input-package",
  "sentiment": "Negative",
  "emotionMatrix": [
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

- [ ] Including voice lines as sound file to comments
- [ ] Refactor comment create action
- [X] Config
  - [X] Env
  - [X] Repository
- [ ] [CRUCIBLE] Context aware dynamic quotes
  - Replacing pronouns with respective usernames
    - By parameter
    - By context
- [ ] Barrelization (is that even a thing?) of the imports/exports
  - Especially for external dependencies since they can be due to change
- [ ] Public REST API for quotes
- [ ] Introduce main subject/person for each strategy, which will be used for reply-to


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

### Building GitHub Bot resources

- https://www.geeksforgeeks.org/making-a-github-bot/

### Blunder of imports

Node.js refuses to allow extensionless imports, e.g: `import {QuoteFacade} from "./QuoteFacade";`

Therefor you have to add `.js` extension to each import. Which is looking very dumb to do in typescript

- https://stackoverflow.com/questions/75807785/why-do-i-need-to-include-js-extension-in-typescript-import-for-custom-module
- https://stackoverflow.com/questions/72491392/when-do-we-need-to-add-file-extension-when-importing-javascript-modules

Ridiculous.


### Reasons to hate Typescript

- Made by Microsoft
- TS2590: Expression produces a union type that is too complex to represent.

### IoC Container & Dependency Inversion principle of SOLID

We need to perform research on this, and conclude the topic.

- IoC: Inversion of Control
  - IoC includes the DI
  - DI is a form of IoC
- DIP: Dependency Inversion Principle, D of SOLID
- DI: Dependency injection
  - Taking params through constructor is the simplest form of Dependency Injection

#### Resources:

- https://www.freecodecamp.org/news/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f
- https://medium.com/@magnusjt/ioc-container-in-nodejs-e7aea8a89600
- https://martinfowler.com/articles/dipInTheWild.html#YouMeanDependencyInversionRight
- https://stackoverflow.com/questions/6550700/inversion-of-control-vs-dependency-injection
- https://medium.com/ssense-tech/dependency-injection-vs-dependency-inversion-vs-inversion-of-control-lets-set-the-record-straight-5dc818dc32d1
- https://livebook.manning.com/book/dependency-injection-principles-practices-patterns/chapter-1/35


- > If you start passing the container around (for other purposes than declaring things on it, like with the providers), it is not an IOC container anymore, it is a service locator.

### Node.js lifecycle

Opposed to Laravel's request based lifecycle where lifecycle starts and ends with each request, Node.js persists the app state, which means lifecycle starts with the app start and ends when the app exits.

This means, as long as the Node.js app keeps on running, any statics and singletons will be kept on memory.

Reason for this is; Node.js is an event driven, non-blocking framework. It is designed to handle multiple simultaneous applications.

> Node.js has persistent state!

In conclusion, refrain from using static variables and singletons as they may lead to confusion and bugs down the line.


### Mocking

- Mocking: you "mock" a function, alter/define its implementation to fit your agenda.
- Spying: you "spy" a method, method of a class or an object. Alter/define its implementation.

Mocking/spying allow you to register calls and responses. It also enables you to implement them numerous times as needed. It is actually such a strong capability.
 