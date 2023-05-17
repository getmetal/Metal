"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapChatMessagesToStoredMessages = exports.mapStoredMessagesToChatMessages = void 0;
const index_js_1 = require("../../schema/index.cjs");
function mapStoredMessagesToChatMessages(messages) {
    return messages.map((message) => {
        switch (message.type) {
            case "human":
                return new index_js_1.HumanChatMessage(message.text);
            case "ai":
                return new index_js_1.AIChatMessage(message.text);
            case "system":
                return new index_js_1.SystemChatMessage(message.text);
            default: {
                if (message.role === undefined) {
                    throw new Error("Role must be defined for generic messages");
                }
                return new index_js_1.ChatMessage(message.text, message.role);
            }
        }
    });
}
exports.mapStoredMessagesToChatMessages = mapStoredMessagesToChatMessages;
function mapChatMessagesToStoredMessages(messages) {
    return messages.map((message) => ({
        type: message._getType(),
        role: "role" in message ? message.role : undefined,
        text: message.text,
    }));
}
exports.mapChatMessagesToStoredMessages = mapChatMessagesToStoredMessages;
