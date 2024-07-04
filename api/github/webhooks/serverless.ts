import {createNodeMiddleware, createProbot} from "probot";


import app from "../../../src";

const probot = createProbot();

module.exports = createNodeMiddleware(app, { probot, webhooksPath: '/api/github/webhooks' });