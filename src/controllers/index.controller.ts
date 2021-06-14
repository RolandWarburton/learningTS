// This file is a controller that runs some code when a route is hit
// This file is referenced by the index.route.ts ROUTE which uses IndexController as its CONTROLLER

import { NextFunction, Request, Response } from "express";

class IndexController {
	public index = (req: Request, res: Response, next: NextFunction): void => {
		try {
			res.sendStatus(200);
		} catch (error) {
			next(error);
		}
	};
}

export default IndexController;
