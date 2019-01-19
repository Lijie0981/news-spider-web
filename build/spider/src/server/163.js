"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var superagent_1 = __importDefault(require("superagent"));
var debug_1 = __importDefault(require("debug"));
var fs_1 = __importDefault(require("fs"));
var lodash_1 = __importDefault(require("lodash"));
var link = { index: 'https://news.163.com/' };
var className = { head: '.ns_area.list ul' };
var log = debug_1.default('spider:163');
require('superagent-charset')(superagent_1.default);
function getHeadLinks(link) {
    if (link === void 0) { link = { index: '' }; }
    return __awaiter(this, void 0, void 0, function () {
        var res, $_1, headLinks_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log('163 config', link);
                    return [4 /*yield*/, superagent_1.default.get(link.index).charset('gbk')];
                case 1:
                    res = _a.sent();
                    log(res.status);
                    if (res.status === 200) {
                        $_1 = cheerio_1.default.load(res.text);
                        headLinks_1 = {};
                        log($_1(className.head)[0].children.length);
                        $_1(className.head)[0].children.filter(function (item) { return item.name; }).forEach(function (element) {
                            var $element = $_1(element).find('a');
                            var href = $element.attr('href');
                            var text = $element.text();
                            headLinks_1[text] = href;
                        });
                        return [2 /*return*/, lodash_1.default.extend(link, headLinks_1)];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
;
function writeJson(_a) {
    var key = _a.key, value = _a.value, path = _a.path;
    log(path);
    var content = JSON.parse(fs_1.default.readFileSync(path, 'utf8'));
    log('json read', content);
    if (key && content) {
        content[key] = value;
    }
    else {
        content = value;
    }
    fs_1.default.writeFileSync(path, JSON.stringify(content));
}
function server() {
    return __awaiter(this, void 0, void 0, function () {
        var a;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getHeadLinks(link)];
                case 1:
                    a = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = { server: server };
