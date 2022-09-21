import { LoggerService } from '@nestjs/common';
import log4js from "log4js"
import chalk  from "chalk";


const log4jsConfig= ()=> {
  log4js.configure({
    appenders: {
      console: {
        type: "console",
        layout: {
          type: "pattern",
          pattern: `${chalk.gray("%d{hh:mm:ss.SSS}")} ${chalk.bold("%[%5.-5p%]")}%-0.-20c%-40.-50x{fileName} ${chalk.hex('#FFC16BFF').italic('%m')}`,
          tokens: {
            fileName: (logEvent) => chalk.italic(logEvent.fileName
              .replace(`${process.env.PWD}/`, "")
              .replace(/(.js|.ts)$/g, "")
              .concat(`:${logEvent.lineNumber}`)
              .replace(/src\/logger.config:\d*/, chalk.gray("NestJS Logger"))),
          }
        }
      }
    },
    categories: {
      default: {
        appenders: ["console"],
        level: "debug",
        enableCallStack: true,
      }
    }
  })
  global.log = log4js.getLogger(" ")
}


export class LoggerConfig implements LoggerService {

  constructor() {
    log4jsConfig()
  }

  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    log.info(message, optionalParams)
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    log.error(message, ...optionalParams)
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    log.warn(message, ...optionalParams)
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {
    log.debug(message,optionalParams)
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {
    log.trace(message, optionalParams)
  }
}
