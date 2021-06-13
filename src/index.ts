import express, { Application, Request, Response } from "express";
import a from "./myModule";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
	console.log(a);
	res.status(200).json({ message: "hello world" });
});

app.listen(3000, () => {
	console.log("server running");
});
