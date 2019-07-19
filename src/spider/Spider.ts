import cheerio from "cheerio";
import Debug from "debug";
import request, { Response } from 'request';
import * as iconv from 'iconv-lite';
import { SITE, sitelist } from '../config/site';
import * as fs from 'fs';
import * as path from 'path';
import * as moment from 'moment';
import Url from 'url-parse';
import { Article, ArticleInterface } from './models/Article';
// import Task from './Task';
const debug = Debug;
interface SpiderInfo {
    site: SITE;
    log: any;
    fetchTimes: number;
    errorNum: number;
    parseTimes: number;
    runFlag: boolean;
    articleNum: number;
    startTime: string;
    endTime: string;
    toDayArticlesNum: number;
    articleLinksReg: string;
}
interface SpiderInterface extends SpiderInfo {
    fetchPage(url: string): object;
    parseSiteHead(document: Cheerio): object;
    parseArticle(document: Cheerio, column: string): ArticleInterface;
    handleError(err: Error, msg?: string): boolean;
    saveArticle(article: ArticleInterface): boolean;
    getSpiderInfo(): SpiderInfo;
    run(): boolean;
    runFetch(): boolean | string;
    pause(): boolean | string;
    restart(): boolean | string;
    init(): boolean | string;
    create(): object;
    parseTime(site: SITE): string;
    parseLink($: Cheerio, res: any, column: string): string;
    handleAllLinks(): void;
}
interface Page {
    $page: CheerioStatic;
    pageResponse: Response;
}
let taskStack: object = {};
class Spider implements SpiderInterface {
    // site:{};
    site: SITE;
    log: any;
    fetchTimes: number;
    errorNum: number;
    parseTimes: number;
    runFlag: boolean;
    articleNum: number;
    startTime: string;
    endTime: string;
    toDayArticlesNum: number;
    articleLinksReg: string;
    constructor(site: SITE) {
        this.site = site;
        this.log = debug(`spider:${site.name}`);
        this.site.pageLinks = new Set();
        this.site.articles = new Map();
        this.fetchTimes = 0;
        this.errorNum = 0;
        this.parseTimes = 0;
        this.runFlag = true;
        this.articleNum = 0;
        Object.defineProperty(taskStack, site.name, {
            value: this
        });
    }
    async fetchPage(url: string): Promise<Page> {
        this.log(url);
        let res: any;
        try {
            res = await new Promise((res, rej) => {
                request({ uri: url, encoding: null }, (err, response, body) => {
                    if (err) {
                        rej(err);
                        this.handleError(err, `请求${url} 失败`);
                    }
                    else {
                        let charset = "utf-8";
                        let arr = body.toString().match(/<meta([^>]*?)>/g);
                        if (response.headers['content-type'].match(/GB/i)) {
                            charset = 'gbk';
                        }
                        if (arr && charset !== 'gbk') {
                            arr.forEach(function (val: string) {
                                let match = val.match(/charset\s*=\s*(.+)\"/);
                                if (match && match[1]) {
                                    if (match[1].substr(0, 1) == '"') match[1] = match[1].substr(1);
                                    charset = match[1].trim();
                                    return false;
                                }
                            })
                        }
                        let resData = {
                            body: iconv.decode(body, charset),
                            response
                        };
                        res(resData);
                    }
                });
            });
        } catch (e) {
            this.handleError(e);
        }
        let page = '';
        if (res.body) {
            page = res.body;
        } else {
            page = '<html></html>';
        }
        let $page = cheerio.load(page);
        if (res.response.request) {
            res.response.request.url = res.response.request.href;
            res.response.request.protocol = new Url(res.response.request.href).protocol;
        }
        return { $page, pageResponse: res.response };
    };
    async parseSiteHead(document: Cheerio): Promise<object> {
        if (this.site.subLinks && Object.values(this.site.subLinks).length !== 0) { this.log(this.site.subLinks); return this.site.subLinks; }
        let { $page, pageResponse } = await this.fetchPage(this.site.index);
        let $headers = $page(this.site.htmlClass.header);
        let subLinks = {};
        $headers.each((i, e) => {
            let href =
                    cheerio(e).attr('href').startsWith('//')
                    &&
                    !cheerio(e).attr('href').includes('http')
                    ? pageResponse.request.href.match(/https?/)[0] + cheerio(e).attr('href')
                    : cheerio(e).attr('href');
            href = href.match(/\.(com|cn)/) ? href : this.site.index + href.substring(1);
            Object.defineProperty(subLinks, cheerio(e).text().trim(), {
                value: href
            });
        });
        return subLinks;
    };
    parseArticle(document: Cheerio, column: string): ArticleInterface { return; };
    handleError(err: Error, msg?: string): boolean { return true; };
    saveArticle(article: ArticleInterface): boolean { return true; };
    getSpiderInfo(): SpiderInfo { return; };
    run(): boolean { return true; };
    runFetch(): boolean | string { return ''; };
    pause(): boolean | string { return ''; };
    restart(): boolean | string { return ''; };
    init(): boolean | string { return; };
    create(): object { return; };
    parseTime(site: SITE): string { return; };
    parseLink($: Cheerio, res: any, column: string): string { return };
    handleAllLinks(): void { };
}
let spider = new Spider(sitelist.netease);

module.exports = { Spider };
