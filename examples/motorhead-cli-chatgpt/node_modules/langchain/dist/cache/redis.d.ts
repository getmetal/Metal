import type { RedisClientType } from "redis";
import { BaseCache, Generation } from "../schema/index.js";
export declare class RedisCache extends BaseCache {
    private redisClient;
    constructor(redisClient: RedisClientType);
    lookup(prompt: string, llmKey: string): Promise<Generation[] | null>;
    update(prompt: string, llmKey: string, value: Generation[]): Promise<void>;
}
