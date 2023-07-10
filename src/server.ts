import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { errorLogger, logger } from "./shared/logger";
import { Server } from "http";

process.on("uncaughtException", error => {
	console.log(error);
	process.exit(1);
});

let server: Server;

//database connection
async function bootstrap() {
	try {
		await mongoose.connect(config.database_url as string);
		console.log(`🛢 Database connection successful`);

		server = app.listen(config.port, () => {
			console.log(`Server is  listening on port ${config.port}`);
		});
	} catch (err) {
		console.log(`Failed to connect database`, err);
	}

	process.on("unhandleRejection", error => {
		if (server) {
			server.close(() => {
				console.log(error);
				process.exit(1);
			});
		} else {
			process.exit(1);
		}
	});
}
bootstrap();

process.on("SIGTERM", () => {
	console.log("SIGTERM is received");
	if (server) {
		server.close();
	}
});
