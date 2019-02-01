"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = __importDefault(require("bluebird"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_json_1 = __importDefault(require("./config/db.json"));
const express_1 = __importDefault(require("express"));
// const MongoStore = mongo(session);
// Create Express server
const app = express_1.default();
mongoose_1.default.Promise = bluebird_1.default;
mongoose_1.default.connect(`${db_json_1.default.url}${db_json_1.default.name}`, { useMongoClient: true }).then(() => { }).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});
exports.default = app;
//# sourceMappingURL=index.js.map