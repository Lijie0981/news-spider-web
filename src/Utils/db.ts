import { db } from "../config/db";
import mongoose from "mongoose";
import debug from "debug";
debug('debug');
const DB_URL:string = db.url;
/**
 * 连接
 */
mongoose.connect(DB_URL);

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {    
    debug('Mongoose connection open to ' + DB_URL);  
});    

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {    
    debug('Mongoose connection error: ' + err);  
});    
 
/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {    
    debug('Mongoose connection disconnected');  
});    

module.exports = mongoose;