import { BaseChatMessage } from "../../schema/index.js";
export interface StoredMessage {
    type: string;
    role: string | undefined;
    text: string;
}
export declare function mapStoredMessagesToChatMessages(messages: StoredMessage[]): BaseChatMessage[];
export declare function mapChatMessagesToStoredMessages(messages: BaseChatMessage[]): StoredMessage[];
