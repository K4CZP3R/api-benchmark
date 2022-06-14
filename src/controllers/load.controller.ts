import { NextFunction, Request, Response } from "express";
import { hashPassword } from "../helpers/password.helper";
import { generateRandomSecret } from "../helpers/secure.helper";
import { IRoute } from "../models/interfaces/route.interface";
import { BaseController } from "./base.controller";

export class LoadController extends BaseController {
	routes: IRoute[] = [
		{
			path: "/:inputlen/:inputcount",
			func: this.pathLoad.bind(this),
			method: "GET",
		},
	];

	constructor() {
		super({ path: "/load" });
		this.loadRoutes();
	}

	async pathLoad(req: Request, res: Response, next: NextFunction) {
		var { inputlen, inputcount } = req.params;

		// Generate 100 uuids
		const randomStrings = Array.from({ length: parseInt(inputcount) }, () => {
			return generateRandomSecret(parseInt(inputlen));
		});

		const hashed = await Promise.all(randomStrings.map(hashPassword));

		return res.json({ input: randomStrings, output: hashed });
	}
}
