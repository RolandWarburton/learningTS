// This file is a controller that runs some code when a route is hit
// This file is referenced by the index.route.ts ROUTE which uses IndexController as its CONTROLLER

import { NextFunction, Request, Response } from "express";

class IndexController {
	public index = (req: Request, res: Response): any => {
		res.json({ hello: "world" });
		// try {
		// 	// res.sendStatus(200);
		// } catch (error) {
		// 	// next(error);
		// 	return 1;
		// }
	};
	public pageNotFound = (req: Request, res: Response, next: NextFunction): void => {
		try {
			if (req.accepts("json")) {
				res.status(404).json({ error: "Not Found" });
			} else {
				res.sendStatus(404);
			}
		} catch (error) {
			next(error);
		}
	};
}

export default IndexController;
