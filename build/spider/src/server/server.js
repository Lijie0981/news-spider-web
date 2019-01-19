"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _163_1 = __importDefault(require("./163"));
var debug_1 = __importDefault(require("debug"));
var log = debug_1.default('spider:server');
exports.server = function () {
    log('server1');
    _163_1.default.server();
};
