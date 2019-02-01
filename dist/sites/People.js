"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Spider_1 = require("./Spider");
const site_json_1 = __importDefault(require("../config/site.json"));
class Netease extends Spider_1.Spider {
    constructor(sites) {
        super(sites);
    }
}
exports.Netease = Netease;
exports.people = new Netease(site_json_1.default.people);
//# sourceMappingURL=People.js.map