import type { TiktokenModel } from "@dqbd/tiktoken";
export declare const getModelNameForTiktoken: (modelName: string) => TiktokenModel;
export declare const getEmbeddingContextSize: (modelName?: string) => number;
export declare const getModelContextSize: (modelName: string) => number;
interface CalculateMaxTokenProps {
    prompt: string;
    modelName: TiktokenModel;
}
export declare const importTiktoken: () => Promise<{
    encoding_for_model: typeof import("@dqbd/tiktoken").encoding_for_model;
} | {
    encoding_for_model: null;
}>;
export declare const calculateMaxTokens: ({ prompt, modelName, }: CalculateMaxTokenProps) => Promise<number>;
export {};
