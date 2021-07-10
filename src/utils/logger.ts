/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */

/* eslint-disable node/no-unpublished-import */
import fs from "fs";
import winston, { transport } from "winston";
import dailyRotateFile from "winston-daily-rotate-file";

const logDir = __dirname + "/../logs";

if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

// ##──── LOG FORMATS ───────────────────────────────────────────────────────────────────────

const logFormat = winston.format.printf(
	({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
);

const logFormatTimestamp = winston.format.combine(
	winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
	winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
);

// ##──── TRANSPORTS ────────────────────────────────────────────────────────────────────────

// Store a generic list of transports
const transports: transport[] = [];

// Transport One
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

// Transport Two
transports.push(new winston.transports.Console());

// ##──── INFO LEVEL SPECIFIC LOGGER ────────────────────────────────────────────────────────

// level			when logger.info() is called, this runs
// format			winston.format.printf, or winston.format.json, etc.
// 						winston.format.combine lets me pass the timestamp to the custom logFormat as well (as a param)
// defaultMeta		meta information included with the log
// transports		where is the file going. IE to the log rotator, and to the console
const logger = winston.createLogger({
	level: "info",
	format: winston.format.combine(winston.format.timestamp(), logFormat),
	defaultMeta: { service: "user-service" },
	transports: transports,
});

// Add an additional transport to the project to log to the console as well
// We could also have specified this as a transport in the transports array
// logger.add(
// 	new winston.transports.Console({
// 		format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
// 	})
// );

// ##──── GENERIC LOGGER ────────────────────────────────────────────────────────────────────

// Because this generic logger does not have a {level: info|warn|error|etc} field, it will trigger for every single winston log event
const genericLogger = winston.createLogger({
	format: logFormatTimestamp,
	transports: [],
});

// This is a dead (silent: true) logger that just exists as a backup if there is no transports defined
// The purpose of this is because if we are not running in development or production (EG process.env.NODE_ENV === "test")
// 		Then we decide to just log nothing at all
genericLogger.add(
	new winston.transports.Console({
		silent: true,
	})
);

// add a transport for development
if (process.env["NODE_ENV"] == "development") {
	genericLogger.add(
		new winston.transports.Console({
			format: winston.format.printf(({ level, message }) => `${level} ${message}`),
		})
	);
}

// add a transport for production
if (process.env["NODE_ENV"] == "production") {
	genericLogger.add(
		new winston.transports.Console({
			format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
		})
	);
}

// ##──── STREAM LOGGER ─────────────────────────────────────────────────────────────────────

// This is an object that can be called through other middleware,
// 	for example morgan can call the stream.write function to write its logs INTO winston
const stream = {
	write: (message: string): void => {
		logger.info(message.substring(0, message.lastIndexOf("\n")));
	},
};

export { genericLogger, logger, stream };
