import express from "express";
import helmet from "helmet";
import cors from "cors";

import { IController } from "./models/interfaces/controller.interface";
import { getEnvironment } from "./helpers/dotenv.helper";

import { Environment } from "./models/environment.model";
import { LoadController } from "./controllers/load.controller";
import { errorMiddleware } from "./middlewares/error.middleware";

export class App {
	public app: express.Express;

	private controllers: IController[] = [new LoadController()];

	constructor() {
		this.app = express();

		this.bootstrapApp()
			.then(() => {
				console.log("App bootstrapped!");
			})
			.catch((e: any) => {
				console.error("Something went wrong while bootstrapping", e);
			});
	}

	private async bootstrapApp() {
		const env = getEnvironment();
		this.setupDi(env);
		this.setupMiddlewares();
		this.setupControllers();
		this.setupAfterMiddlewares();
	}

	private setupDi(env: Environment) {}

	private setupMiddlewares() {
		this.app.use(helmet());
		this.app.use(cors());
		this.app.use(express.json());
	}

	private setupControllers() {
		this.controllers.forEach(controller => {
			this.app.use(controller.path, controller.router);
		});
	}

	private setupAfterMiddlewares() {
		this.app.use(errorMiddleware);
	}
}
