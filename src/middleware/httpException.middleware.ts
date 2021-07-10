// This file is called by an MVC controller when it fails to run
// It uses the custom HttpException which extends the Error class with a HTTP "status" field

import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";
import { genericLogger } from "../utils/logger";

// in order for express to treat this as propper middleware, it requires ALL the parameters (error, req, res, next) to be passed in
function errorMiddleware(error: unknown, req: Request, res: Response, next: NextFunction): void {
	if (error instanceof HttpException) {
		const status: number = error.status || 500;
		const message: string = error.message || "Something went wrong";

		genericLogger.warn(`[ERROR] ${status} ${message}`);

		res.setHeader("Content-Type", "application/json");
		res.status(status);
		res.json({ message });
	}
	next(error);
}
export default errorMiddleware;
