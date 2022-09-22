import { Logger } from "log4js";
import Redis from "ioredis";

declare global {
  var log: Logger;
}

export interface CacheService extends Redis {
  quick(key: string,callback);
}
