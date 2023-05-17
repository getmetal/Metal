"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMaxTokens = exports.importTiktoken = exports.getModelContextSize = exports.getEmbeddingContextSize = exports.getModelNameForTiktoken = void 0;
// https://www.npmjs.com/package/@dqbd/tiktoken
const getModelNameForTiktoken = (modelName) => {
    if (modelName.startsWith("gpt-3.5-turbo-")) {
        return "gpt-3.5-turbo";
    }
    if (modelName.startsWith("gpt-4-32k-")) {
        return "gpt-4-32k";
    }
    if (modelName.startsWith("gpt-4-")) {
        return "gpt-4";
    }
    return modelName;
};
exports.getModelNameForTiktoken = getModelNameForTiktoken;
const getEmbeddingContextSize = (modelName) => {
    switch (modelName) {
        case "text-embedding-ada-002":
            return 8191;
        default:
            return 2046;
    }
};
exports.getEmbeddingContextSize = getEmbeddingContextSize;
const getModelContextSize = (modelName) => {
    switch ((0, exports.getModelNameForTiktoken)(modelName)) {
        case "gpt-3.5-turbo":
            return 4096;
        case "gpt-4-32k":
            return 32768;
        case "gpt-4":
            return 8192;
        case "text-davinci-003":
            return 4097;
        case "text-curie-001":
            return 2048;
        case "text-babbage-001":
            return 2048;
        case "text-ada-001":
            return 2048;
        case "code-davinci-002":
            return 8000;
        case "code-cushman-001":
            return 2048;
        default:
            return 4097;
    }
};
exports.getModelContextSize = getModelContextSize;
const importTiktoken = async () => {
    try {
        const { encoding_for_model } = await import("@dqbd/tiktoken");
        return { encoding_for_model };
    }
    catch (error) {
        console.log(error);
        return { encoding_for_model: null };
    }
};
exports.importTiktoken = importTiktoken;
const calculateMaxTokens = async ({ prompt, modelName, }) => {
    const { encoding_for_model } = await (0, exports.importTiktoken)();
    // fallback to approximate calculation if tiktoken is not available
    let numTokens = Math.ceil(prompt.length / 4);
    try {
        if (encoding_for_model) {
            const encoding = encoding_for_model((0, exports.getModelNameForTiktoken)(modelName));
            const tokenized = encoding.encode(prompt);
            numTokens = tokenized.length;
            encoding.free();
        }
    }
    catch (error) {
        console.warn("Failed to calculate number of tokens with tiktoken, falling back to approximate count", error);
    }
    const maxTokens = (0, exports.getModelContextSize)(modelName);
    return maxTokens - numTokens;
};
exports.calculateMaxTokens = calculateMaxTokens;
