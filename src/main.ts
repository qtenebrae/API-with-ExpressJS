import { Container } from "inversify";
import { App } from "./app";
import { TYPES } from "./types";
import { ILogger } from "./logger/logger.interface";
import { LoggerService } from "./logger/logger.service";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import { ExeptionFilter } from "./errors/exeption.filter";
import { UserController } from "./users/users.controller";

const appContainer = new Container();
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
appContainer.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
appContainer.bind<UserController>(TYPES.UserController).to(UserController);
appContainer.bind<App>(TYPES.Application).to(App);
const app = appContainer.get<App>(TYPES.Application);
app.init();

export { app, appContainer };
