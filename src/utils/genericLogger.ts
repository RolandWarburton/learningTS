/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */

/* eslint-disable node/no-unpublished-import */
import winston from "winston";
import consoleTransport from "./transports/console";
import ConsoleTimestampTransport from "./transports/consoleTimestamp";

// ##──── LOG FORMATS ───────────────────────────────────────────────────────────────────────

// const logFormatTimestamp = winston.format.combine(
// 	winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
// 	winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
// );

// const logConsoleColorful = winston.format.combine(
// 	winston.format.colorize(),
// 	winston.format.printf(({ level, message }) => `${level} ${message}`)
// );

// ##──── GENERIC LOGGER ────────────────────────────────────────────────────────────────────

// Because this generic logger does not have a {level: info|warn|error|etc} field, it will trigger for every single winston log event
const genericLogger = winston.createLogger({
	// format: logFormatTimestamp,
	transports: [],
});

switch (process.env["NODE_ENV"]) {
	case "development":
		genericLogger.add(consoleTransport);
		break;

	case "production":
		genericLogger.add(ConsoleTimestampTransport);
		break;

	default:
		// This is a dead (silent: true) logger that just exists as a backup if there is no transports defined
		// The purpose of this is because if we are not running in development or production (IE process.env.NODE_ENV === "test")
		// 		Then we decide to just log nothing at all
		genericLogger.add(
			new winston.transports.Console({
				silent: true,
			})
		);
		break;
}

export default genericLogger;
