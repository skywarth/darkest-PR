# Darkest-PR

> Ruin has come to your repository! 

Ever wanted the ancestor from Darkest Dungeon to narrate your development in his eccentric way?

GitHub app/bot for responding to actions and events in your repository using contextual quotes from Darkest Dungeon.

[![codecov](https://codecov.io/gh/skywarth/darkest-PR/graph/badge.svg?token=Z86VA7I4HH)](https://codecov.io/gh/skywarth/darkest-PR)
[![Known Vulnerabilities](https://snyk.io/test/github/skywarth/darkest-PR/badge.svg)](https://snyk.io/test/github/skywarth/darkest-PR)
[![Vercel Deploy](https://deploy-badge.vercel.app/vercel/darkest-pr)](https://darkest-pr.vercel.app/)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=skywarth_darkest-PR&metric=bugs)](https://sonarcloud.io/summary/new_code?id=skywarth_darkest-PR)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=skywarth_darkest-PR&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=skywarth_darkest-PR)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=skywarth_darkest-PR&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=skywarth_darkest-PR)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=skywarth_darkest-PR&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=skywarth_darkest-PR)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=skywarth_darkest-PR&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=skywarth_darkest-PR)

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=skywarth_darkest-PR)](https://sonarcloud.io/summary/new_code?id=skywarth_darkest-PR)

<!--- ![Vercel](https://vercelbadge.vercel.app/api/skywarth/darkest-pr) -->

## Table of Contents

- [Preface](#preface)
  - [What is this?](#what-is-this)
  - [Motivation](#motivation)
- Usage
  - Demo
  - Use-cases
  - ActionContext parameter
  - Installation
  - Configuration
- [Info for nerds](#info-for-nerds)
  - How does it work
  - [Design](#design)
- [Roadmap & TODOs](#roadmap)
  - [Roadmap](#roadmap) 
  - [Use case analysis](#use-case-analysis)
- Credits
- Disclaimer & legal
  - Disclaimer
  - Privacy concerns
- [Development](#development)
  - [Running locally](#running-locally)
- Notes to self

## Preface

### What is this?

Darkest-PR is a GitHub app/bot to narrate your development, making development more exciting *or desperate*.

When certain events occur in the repository, Darkest-PR automatically evaluates the situation and responds with a ***fitting*** quote of ancestor from Darkest Dungeon.
Making the development more like a dungeon crawler run, a sensational journey, more *alive*, more sentimental, more thrilling and more depressing...

Depending on the contextual emotional matrix of the event, it could respond with a quote that'll raise the spirits of your teammates, rally their souls, or it could leave a comment to shame them for their failure, or compliment their greatness, strike fear into their hearts, speak out loud their rage. 

Imagine such cases:
- Someone is removed from PR assignment and the bot responds with:
  - > "Send this one to journey elsewhere, for we have need of sterner stock."
- PR is rejected (request change) and the bot responds with:
  - > "Carelessness will find no clemency in this place!"
- PR is closed without merge and the bot responds with:
  - > "A setback, but not the end of things!"
- PR is accepted and merged immediately and the bot responds with:
  - > "A singular strike!"
- Someone is assigned to an issue and the bot responds with:
  - > "More arrive, foolishly seeking fortune and glory in this domain of the damned.",

Sometimes the quotes are so fitting, so perfect for the situation; it makes development a marvelous journey. Such epic that is worth narrating.

### Motivation

I've always enjoyed roguelike, dungeon-crawler and RPG games. Among all those games many, Darkest Dungeon has a special place in my heart. 
In no such game I've encountered such captivating, strong, profound and invested monologues. Both the audio and the narration scripts are spectacular. It is so ***shakespearean***. Another reason I keep it so dear is that it's stress, hope, despair, loss mechanics are unique. 
It really makes you connected with the game, as if you're feeling the actual moments your characters are going through, the ambiance is riveting. The first time you get party-wiped, you learn the true meaning of desperation and the setting of the game. It's like Dark Souls of dungeon crawlers.

Fun fact: I unconsciously memorized 90% of all the quotes from Darkest Dungeon.

In my career, I've reviewed thousands upon thousands pull requests. Countless issues, bugs tackled. Worked with my fellow teammates to undertake many challenging features. 
Each of these feature a different setting of emotions; some of them are definitive struggles, some a gentle breeze, some terrorizing nightmares, some are well-deserved relief after completing them.

Then I realized, each development is very similar to Darkest Dungeon runs. Your team is your party, your environment is your location, your task/goal is your adversary. So it would be apt to narrate the development like so.       

And for this reason, Darkest-PR has come to life. To make development process more interactive, more fun, more story-like, an epic tale.


## Info for nerds

### Design

#### Patterns

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
- [X] Refactor comment create action
- [X] Config
  - [X] Env
  - [X] Repository
    - [ ] Disabling certain sentiments/quotes for HR & work ethics purposes
- [ ] [CRUCIBLE] Context aware dynamic quotes
  - Replacing pronouns with respective usernames
    - By parameter
    - By context
  - Introduce main subject/person for each strategy, which will be used for reply-to
- [ ] Barrelization (is that even a thing?) of the imports/exports
  - Especially for external dependencies since they can be due to change
  - consider `@octokit/webhooks` instead of `@octokit/webhooks/dist-types/types`
- [ ] Public REST API for quotes
- [X] Deployment
- [ ] Quotes
  - [X] Darkest Dungeon 1 quotes
    - Story-like quotes are excluded intentionally
  - [ ] Darkest Dungeon 2 quotes 
- [ ] Non-app usage via a GitHub bot user, like `CodiumAI-Agent`
- [ ] Documentation
  - [ ] README
  - [ ] Github pages site
  - [ ] Marketplace description, tags, title, logo
- [ ] Publishing
  - [ ] Marketplace
  - [ ] Reddit
  - [ ] DEV.to
  - [ ] Medium

---

### Use-case analysis

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
    - [X] Approved
    - [X] Rejected (change request)
      - [ ] Distinguish/variate by requested change amount
    - [X] Just comment


- [X] Issue/PR comment
  - Tagging the bot
    - [X] No input package param provided
    - [X] Input package param provided
    - [X] Partial input package param provided

- [ ] Release



## Development

### Running locally

#### Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

#### Docker

```sh
# 1. Build container
docker build -t darkest-PR .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> darkest-PR
```

## Notes to self

<details><summary>Notes to self</summary>

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


### Deployment

- https://probot.github.io/docs/deployment/
- https://github.com/probot/example-vercel

</details>

