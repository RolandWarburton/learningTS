import cors from "cors";
import express from "express";
import helmet from "helmet";
import Route from "./interfaces/routes.interface";
import errorMiddleware from "./middleware/error.middleware";
import { logger } from "./utils/logger";
// eslint-disable-next-line node/no-unpublished-import
import swaggerUi from "swagger-ui-express";
// eslint-disable-next-line node/no-unpublished-import
import swaggerJsdoc from "swagger-jsdoc";

class App {
	// List all the fields that this class will contain
	// Note that routes passed to the controller does not exist here
	// 	Thats because the routes are consumer immediately by initializeRoutes and attached to the app at runtime
	public app: express.Application;
	public port: string | number;
	public env: boolean;

	constructor(routes: Route[]) {
		this.app = express();
		this.port = process.env["PORT"] || 3000;
		this.env = process.env["NODE_ENV"] === "production" ? true : false;

		this.initializeMiddlewares();
		this.initilizeDocs();
		this.initializeRoutes(routes);
		this.initializeErrorHandling();
	}

	public listen(): void {
		/* istanbul ignore next */
		this.app.listen(this.port, () => {
			logger.info(`🚀 App listening on the port ${this.port}`);
		});
	}

	public getServer(): express.Application {
		return this.app;
	}

	private initializeMiddlewares() {
		if (this.env) {
			// running in production
			this.app.use(helmet());
			this.app.use(cors({ origin: `${process.env["DOMAIN"]}`, credentials: true }));
		} else {
			this.app.use(cors({ origin: true, credentials: true }));
		}

		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	// Create the swagger UI for openapi documentation
	// This step MUST come before the initialize routes
	private initilizeDocs() {
		const options = {
			definition: {
				openapi: "3.0.0",
				info: {
					title: "Hello World",
					version: "1.0.0",
				},
			},
			apis: ["./*.js"], // files containing annotations as above
		};

		const openapiSpecification = swaggerJsdoc(options);

		this.app.use("/api", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
	}

	// consume the routes and add them to the app
	private initializeRoutes(routes: Route[]) {
		routes.forEach((route) => {
			this.app.use("/", route.router);
		});
	}

	private initializeErrorHandling() {
		this.app.use(errorMiddleware);
	}
}

export default App;
