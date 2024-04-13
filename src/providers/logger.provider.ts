import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as cliColor from 'cli-color';

export class Logger implements LoggerService {
  constructor(private readonly context?: string) {}

  private logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.errors({ stack: true }),
          winston.format.splat(),
          winston.format.printf(({ level, message, timestamp }) => {
            const date = new Date(new Date(Date.now()));
            const formattedTimestamp = cliColor.white(
              date.toLocaleString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
              }),
            );
            const formattedLevel = level.toUpperCase();
            const formattedContext = this.context
              ? cliColor.yellow(`[${this.context}]`)
              : '';
            return cliColor.greenBright(
              `[socialize-app] ${process.pid}  - ${formattedTimestamp}   ${formattedLevel} ${formattedContext ? formattedContext + ' ' : ''}${message}`,
            );
          }),
        ),
      }),
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
  });

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  private formatMessage(message: string): string {
    return this.context ? `[${this.context}] ${message}` : message;
  }
}
