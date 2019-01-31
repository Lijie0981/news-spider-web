"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const superagent_charset_1 = __importDefault(require("superagent-charset"));
const debug_1 = __importDefault(require("debug"));
class Spider {
    constructor(sites) {
        this.sites = sites;
        this.log = debug_1.default(`spider:${this.sites.name}`);
    }
    getPageContent(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield superagent_charset_1.default.get(url).charset('gbk');
            this.log('spider get page content status', res.status);
            this.log('spider get page content header', res.header);
            if (res.status) {
                return cheerio_1.default.load(res.text);
            }
            let emptyPage = '<html></html>';
            return cheerio_1.default.load(emptyPage);
        });
    }
    createDatabase() {
    }
    setSubSites(subSite) {
        this.sites.subSite = subSite;
        // TODO write into database
    }
    setArticle(acticle) {
        // TODO write into database
    }
}
exports.Spider = Spider;
//# sourceMappingURL=Spider.js.map