"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
// import appRoutes from "./routes";
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
(0, dotenv_1.config)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// app.use('/', appRoutes);
app.listen(process.env.PORT, () => {
    console.log("server started listening on PORT: ", process.env.PORT);
});
exports.default = app;
