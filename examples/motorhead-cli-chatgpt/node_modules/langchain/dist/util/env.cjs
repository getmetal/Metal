"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
const browser_or_node_1 = require("browser-or-node");
const getEnv = () => {
    let env;
    if (browser_or_node_1.isBrowser) {
        env = "browser";
    }
    else if (browser_or_node_1.isNode) {
        env = "node";
    }
    else if (browser_or_node_1.isWebWorker) {
        env = "webworker";
    }
    else if (browser_or_node_1.isJsDom) {
        env = "jsdom";
    }
    else if (browser_or_node_1.isDeno) {
        env = "deno";
    }
    else {
        env = "other";
    }
    return env;
};
exports.getEnv = getEnv;
