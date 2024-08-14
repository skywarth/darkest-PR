# Darkest-PR

![Darkest-PR Banner](/resc/banner-ultra-wide-medium.png "Darkest-PR Banner")


> Ruin has come to your repository! 

Ever wanted the ancestor from Darkest Dungeon to narrate your development in his eccentric way?

Darkest-PR is a GitHub app/bot for responding to actions and events in your repository using contextual quotes from Darkest Dungeon.

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

## Links:
- GitHub Marketplace listing: https://github.com/marketplace/darkest-pr
- GitHub App Page: https://github.com/apps/darkest-pr
- Probot featured apps listing: https://probot.github.io/apps/darkest-pr/

## Table of Contents

- [Preface](#preface)
  - [What is this?](#what-is-this)
  - [Motivation](#motivation)
- [Usage](#usage)
  - [Demo](#demo)
    - [Demo Repository](#demo-repository)
    - [Screenshots](#screenshots)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [ActionContext parameter](#actioncontext-parameter)
- [Info for nerds](#info-for-nerds)
  - [How does it work](#how-does-it-work)
  - [Design](#design)
- [Roadmap & TODOs](#roadmap)
  - [Roadmap](#roadmap) 
  - [Use cases](#use-cases)
- [Credits](#credits)
- [Disclaimer & legal](#disclaimer--legal)
  - [Disclaimer](#disclaimer)
  - [Privacy concerns](#privacy-concerns)
  - [About the production deployment](#about-the-production-deployment)
- [Development](#development)
  - [Running locally](#running-locally)
- [Notes to self](#notes-to-self)

## Preface

### What is this?

Darkest-PR (PR stands for Pull-Request) is a GitHub app/bot to narrate your development, making development more exciting *or desperate*.

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

## Usage

### Demo

#### Demo Repository
There is a [demo repository](https://github.com/skywarth/bot-test-repo) I've been using since the development of the project.
- [Demo PR](https://github.com/skywarth/bot-test-repo/pull/13)
- [Demo issue (Issue events)](https://github.com/skywarth/bot-test-repo/issues/12)
- [Demo issue (by comment)](https://github.com/skywarth/bot-test-repo/issues/11)

Go ahead and take a look at it there, maybe even add a comment tagging the app like `@Darkest-PR` and you will get a quote from the ancestor.

#### Screenshots

See below screenshots or navigate to [screenshots directory](/resc/screenshots) to see it in action.

<details>
  <summary><b>Click here to see the screenshots</b></summary>


- PR approved

  ![Pull Request Approved](/resc/screenshots/approve-1.png)

- PR closed without merge

  ![Pull Request Closed without merge](/resc/screenshots/PR-closed-no-merge-1.png)

- PR request change (rejected)

  ![PR request change #1](/resc/screenshots/request-change-1.png)

  ![PR request change #2](/resc/screenshots/request-change-2.png)

- PR review comment

  ![Pull Request review comment](/resc/screenshots/review-comment.png)


- PR assignee added

  ![Pull Request Assignee added](/resc/screenshots/assigned-1.png)

- PR assignee removed

  ![Pull Request Assignee removed](/resc/screenshots/unassigned-1.png)


- Tagging the app

  ![Comment tagging the app](/resc/screenshots/tag-comment-overconfidence.png)


</details>

### Installation

Installation is pretty straightforward and instantaneous. There are two methods to install:

#### Method #1

1. Go to the Darkest-PR's [GitHub App page](https://github.com/apps/darkest-pr)
2. Click 'Install' button
3. Select the repositories you want to install the app
4. Confirm the permission and click 'Install'
5. Done! Enjoy.
- So now whenever a [use-case](#use-cases) event occurs, or whenever you mention the app like `@Darkest-PR` it will respond to you!
- Give it a try, submit a comment in any issue/PR in your repository mentioning the app. E.g: `@Darkest-PR ancestor, do your thing.`


#### Method #2

1. Visit the public [GitHub Marketplace listing](https://github.com/marketplace/darkest-pr)
2. Click `add` button
3. Confirm the user/organization to install the app to
4. Select the repositories you want the app to be installed
5. Done! Enjoy.



**Alternatively, head over to [app's page on GitHub](https://github.com/apps/darkest-pr) to install.**

### Configuration

You can configure the behavior of the Darkest-PR via configuration file. 

**Configuration is totally optional, you don't have to define it.**


#### Configuration options

These are the list of values and settings you can adjust which effects how Darkest-PR will act.

| Key                   | Type      | Default              | Description                                                                                                                                                                                                                                                                                                                                   |
|-----------------------|-----------|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `debug_mode`          | `boolean` | `false`              | Controls the debug mode. When debug mode is activated, each comment made by the Darkest-PR will have metrics, details and debug data available along with the quote.                                                                                                                                                                          |
| `emojis`              | `boolean` | `true`               | Controls whether to include emojis in the comments or in any other interaction. When set to false, Darkest-PR will never use emojis for any interaction.                                                                                                                                                                                      |
| `event_subscriptions` | `object`  | (all events enabled) | By default, all event subscriptions are enabled. Use this config to toggle certain event subscriptions. It's expected to be `object` with type `EventSubscriptionsDTO`. `EventSubscriptionsDTO` is basically: keys are event names, values are boolean. You don't have to define every single event, just define the ones you want to adjust. |

#### Event subscriptions

By default, all event subscriptions are enabled and being listened to.

Example `event_subscriptions` definition (don't forget to remove the comments if you're going to use it):
```json5
{
  "event_subscriptions": {
    "pull_request.opened": false, 
    //PR opened event sub disabled, app will ignore such event. 
    "issue_comment.created": true,
    //Issue comment created event sub enabled. Same as default. Makes no difference. App will listen to the event.
    "pull_request_review.submitted": false
    //Pull Request Review submitted event subscription disabled. 
  }
}
```

List of event subscription slugs:

For up-to-date event subscriptions, visit the `index.ts` file.

- `pull_request.opened`
- `pull_request.closed`
- `pull_request_review.submitted`
- `pull_request.review_requested`
- `pull_request.review_request_removed`
- `pull_request.assigned`
- `pull_request.unassigned`
- `issue_comment.created`
- `issues.assigned`
- `issues.unassigned`

#### Default config

This is the default config if you don't define any configuration file in your repository:

```
{
  "debug_mode":false,
  "emojis":true,
  "event_subscriptions":{
        "pull_request.opened":true,
        "pull_request.closed":true,
        "pull_request_review.submitted":true,
        "pull_request.review_requested":true,
        "pull_request.review_request_removed":true,
        "pull_request.assigned":true,
        "pull_request.unassigned":true,
        "issue_comment.created":true,
        "issues.assigned":true,
        "issues.unassigned":true
  }
}

```

#### Configuration file specifications:
- Must be located at **the root of the repository**, 
- File is to be named `.darkest-pr.json`.
- Make sure file content is valid JSON
  - Watch out for line endings, double-quotes, commas etc.
  - [Validate here](https://jsonlint.com/) if you need to
- Always the configuration file on the main/default branch is utilized. If your configuration doesn't take place, make sure it is in master/main/default branch.

Possible reasons why your configuration is ignored by the app:
- Invalid JSON format/structure, contains errors. Cannot be parsed.
- Filename or path is incorrect
- An error occurred while fetching the configuration file from your repository, GitHub or provider related.


### ActionContext Parameter

When you want to invoke Darkest-PR on demand, you can simply mention the app in your comment like so `Gimme quote RN! @Darkest-PR` and it will respond.

But if you want some zest to your response, then you can instruct the app on what kind of quote you're looking for. You may do this by adding a parameter JSON in your comment, and it'll be utilized as long as it is valid. This parameter is called **ActionContext**.

ActionContext is essentially a DTO in form of JSON. It features various parameters to get your desired quote.

- > ActionContext payload requires a key-value pair for correctly identifying the parameter payload. Make sure to include `"identifier":"Darkest-PR-input-package"` in your JSON.
- Each and every parameter in the `ActionContext` is optional, except the `identifier`.
- Don't forget to begin the parameter payload with **```json**

#### ActionContext Structure

```json5
{
  "identifier":"Darkest-PR-input-package",//REQUIRED
  "sentiment": "Negative",//Optional "Negative", "Positive", "Neutral" 
  "emotionMatrix": [//Optional, Array of objects, aka (EmotionMatrix)
    {
      "emotion": "Frustration",//A valid emotion enum from Emotion namespace
      "temperature": 4 //Between 1-5, inclusive
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
  "quoteSlugs":[//Optional, Array of strings of Quote slugs, see `quote-data.json` for quote slugs list.
    //Doesn't guarantee the quote will be one of the given slugs, if ActionContext contains other parameters.
    //It guarantees quote to be one of these only when quoteSlug parameter is given alone with no additional filters
    "overconfidence-is-a-slow-killer",
    "madness-our-old-friend",
    "triumphant-pride",
  ],
  "tags": [//Optional, array of strings. It doesn't guarantee the quote to have these tags. 
    //Quotes with the given tags score higher and are likely to be selected
    "destroyed",
    "obliterated",
    "victory"
  ]
}

```


#### Sample ActionContext #1

Let's say we want an exact quote. That is easy:

**Between the separation lines**.

---

@Darkest-PR, what was that quote about 'grotesque'?

```json
{
  "identifier":"Darkest-PR-input-package",
  "quoteSlugs":["grotesque-in-death"]
}

```

---


#### Sample ActionContext #2

Say you want a random positive quote to rally the spirits of your colleagues.

**Between the separation lines**.

---

Great success, @Darkest-PR give us something nice!

```json
{
  "identifier":"Darkest-PR-input-package",
  "sentiment":"Positive"
}

```

---


#### Sample ActionContext #3

Sample comment below, **between the separation lines**.

To explain this one semantically: we instruct the app to give us a random quote that:
- Has negative sentiment, scores high based on the given emotions (temperature represent intensity of the emotion) and the tags
- OR has one of the given slugs

The quote we receive from the following input would align precisely with the above statement.

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
  "quoteSlugs":[
    "overconfidence-is-a-slow-killer",
    "madness-our-old-friend",
    "triumphant-pride"
  ],
  "tags": [
    "destroyed",
    "obliterated",
    "victory"
  ]
}

```

---



## Info for nerds

### How does it work

Whenever an event occurs in your repository, it is dispatched to the corresponding webhooks of the installed apps. If the corresponding GitHub app has a respective webhook defined for this event, it is fired.
Darkest-PR several GitHub event webhooks defined and listening to, so whenever such event occurs the app/bot takes action. This infrastructure is provided thanks to [Probot](https://probot.github.io/). So basically; on event occurrence, GitHub calls the webhook URL of the app (Darkest-PR) with data payload consisting details about the event and the repository itself. Then this call is routed to corresponding event handler to handle the event, utilizing the data in the payload. 

After an event that is being listened to is fired, payload is digested forwarded to the corresponding strategy pattern implementation to handle the event. Each child strategy is responsible for generating a comment by asserting certain conditions, environment and variables to assess the situation and return a fitting comment about the situation.
Abstract parent strategy then takes the comment returned from the child strategy class and then posts this comment to the respective issue/PR. 

Comments are currently stored in a JSON along with their respective emotion matrix, these comments are loaded into a repository pattern implementation to later be utilized by the strategy classes.

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
- [X] Documentation
  - [X] README
  - [ ] Github pages site
  - [X] Marketplace description, tags, title, logo
- [ ] Publishing
  - [X] Marketplace
  - [X] Reddit
  - [ ] DEV.to
  - [ ] Medium
  - [X] [Probot featured apps](https://probot.github.io/apps/darkest-pr/)

---

### Use-cases

Below you may find the use-cases currently integrated and those that are planned for future. If you want to make a feature request for use-cases, please open a discussion or issue. I would be glad to address your needs.

- [X] Issue
  - [X] Assignee
    - [X] Added
    - [X] Removed
  - [ ] Created 
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




## Credits

### Darkest Dungeon®

Many thanks to [Red Hook Studios](https://www.redhookgames.com/) for developing this amazing game ([Darkest Dungeon®](https://www.darkestdungeon.com/)), it's been a great inspiration for this project.

I would also like to acknowledge the great performance put through by Wayne June, voice actor for the narrator (ancestor) of Darkest Dungeon. I strongly believe his incredible voice acting and strong command of English is what made the game a marvelous one.

### JetBrains
This project has been developed using JetBrains products.
Thanks for their [support for open-source development](https://www.jetbrains.com/community/opensource/#support).


| <img width="150" src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.svg" alt="JetBrains Logo (Main) logo."> | <img width="200" src="https://resources.jetbrains.com/storage/products/company/brand/logos/WebStorm.svg" alt="PhpStorm logo."> |
|--------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|

### Probot

This project is built using [Probot](https://probot.github.io/) framework, which made it incredibly easy to develop, test and deploy GitHub Apps.


## Disclaimer & Legal

### Disclaimer

This project is an open-source GitHub app developed for public use. It essentially publishes comments on GitHub based on emotion matrix of the situation. These comments consist of quotes from the Darkest Dungeon® video game developed by [Red Hook Studios]((https://www.redhookgames.com/)).

This project is not an extension nor a derivative version of the game.

Neither the project (Darkest-PR) nor the developers of this project are affiliated with Red Hook Studios, or endorsed by them in any way. Darkest Dungeon® game, it's trademark, and it's content (e.g: quotes) are a property of Red Hook Studios. The quotes that this project utilizes are from the Darkest Dungeon® game, and is used under the following policy and points:

- Fair use policy
- Non-commercial, non-profit use
- Proper credit, acknowledgement, and attribution to the rightful owners of intellectual property and trademark (see [credits](#credits) and [motivation](#motivation))
- Usage of the quotes may be considered as `transformative nature`
- Aforementioned quotes are publicly available for anyone, and is not pried nor extracted from the source code of the game. They are not subject to piracy

If you are Red Hook Studios or a legal representative thereof, and believe this project infringes on your intellectual property rights, please contact me. I will promptly address your concerns and take immediate action if any required.  

### Privacy Concerns

This is an open-source project where all the source code is laid bare. It doesn't have any database connection, encrypted files or caching system (other than serverless request caching). It doesn't save any event payload to a third party database or storage deliberately. No user data is persisted, stored or collected for the purposes other than processing the event occurrence.  

Data this app gathers from you and your repository are:

- Your repository details
  - repository name
  - link to repository
  - owner user/organization
  - ID
- Event payload (corresponding PR or Issue)
  - No code! Only details of the PR/Issue (ID, name, assignees, date opened etc.)

This app doesn't clone or copy your project, doesn't record project history. I'm also a person who is keen on privacy, and I tried my best to use only necessary amount of data. Moreover, in respect to your privacy no data is stored on a persistent storage, database, or a third-party app. But don't take my word for it, codes are there, go ahead and review each and every single one. If you find a privacy concern, please let me know ASAP, so we can address it immediately. I strive to develop private and secure open-source projects.

Bottom line is, it is safe (in terms of privacy) to use this app on both your public and private projects. 

### About the production deployment

Current production deployment is on Vercel, it is running for free tier. If the app gathers enough attraction and high amounts of traffic, I'll try to move into a paid tier from my own pocket.

The app is developed and maintained on a zero dime, just so you can enjoy it for free. Policy and the philosophy for the project is [FOSS](https://en.wikipedia.org/wiki/Free_and_open-source_software).

I'm just trying to build things that people enjoy using. **So please be nice and do not abuse the app.**  


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

