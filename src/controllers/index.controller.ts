// This file is a controller that runs some code when a route is hit
// This file is referenced by the index.route.ts ROUTE which uses IndexController as its CONTROLLER

import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import { logger } from "../utils/logger";

class IndexController {
	public index = (req: Request, res: Response, next: NextFunction): void => {
		try {
			// check if there was a .error field in the request body
			if (!req?.body?.error) {
				res.status(200).json({ hello: "world" });
			} else {
				res.status(500);
				next(new HttpException(500, "you messed up"));
			}
		} catch (error) {
			next(error);
		}
	};

	public pageNotFound = (req: Request, res: Response, next: NextFunction): void => {
		logger.info("page not found");
		try {
			if (req.accepts("json")) {
				res.status(404).json({ error: "Page Not Found" });
			} else {
				res.sendStatus(404);
			}
		} catch (error) {
			next(error);
		}
	};
}

export default IndexController;
