/* eslint-disable node/no-unpublished-import */
import fs from "fs";
import winston, { transport } from "winston";
import dailyRotateFile from "winston-daily-rotate-file";

const logDir = __dirname + "/../logs";

if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

const logFormat = winston.format.printf(
	({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
);

const transports: transport[] = [];

transports.push(
	// https://github.com/winstonjs/winston-daily-rotate-file
	new dailyRotateFile({
		filename: "application-%DATE%.log",
		datePattern: "YYYY-MM-DD-HH",
		zippedArchive: true,
		maxSize: "20m",
		maxFiles: "14d",
		dirname: "src/logs",
	})
);

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.timestamp({
			format: "YYYY-MM-DD HH:mm:ss",
		}),
		logFormat
	),
	transports: transports,
});

logger.add(
	new winston.transports.Console({
		format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
	})
);

// This is an object that can be called through other middleware,
// 	for example morgan can call the stream.write function to write its logs INTO winston
const stream = {
	write: (message: string): void => {
		logger.info(message.substring(0, message.lastIndexOf("\n")));
	},
};

export { logger, stream };
