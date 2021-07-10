// eslint-disable-next-line node/no-unpublished-import
import winston from "winston";

const format = winston.format.combine(
	winston.format.colorize(),
	winston.format.printf(({ level, message }) => `${level} ${message}`)
);

const consoleTransport = new winston.transports.Console({
	format: format,
});

export default consoleTransport;
