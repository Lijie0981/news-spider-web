import bluebird from "bluebird";
import session from "express-session";
import mongo from "connect-mongo";
import mongoose from "mongoose";
import DBCONF from './config/db.json';
import express from "express";

// const MongoStore = mongo(session);
// Create Express server
export const app = express();

(<any>mongoose).Promise = bluebird;
mongoose.connect(`${DBCONF.url}${DBCONF.name}`).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});
export const server = app.listen(app.get("port"), () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});
