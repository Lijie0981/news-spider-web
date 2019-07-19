import * as cheerio from "cheerio";
import * as debug from 'debug';
import * as request from 'request';
import * as iconv from 'iconv-lite';
import { SITE, sitelist } from '../config/site';
import * as fs from 'fs';
import * as path from 'path';
import * as moment from 'moment';
import * as Url from 'url-parse';
import { Article, ArticleInterface } from './models/Article';
// import Task from './Task';
interface SpiderInfo {
    site: SITE | object;
    log: object;
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
    fetchPage(url: string): Cheerio;
    parseSiteHead(document: Cheerio): object;
    parseArticle(document: Cheerio, column: string): ArticleInterface;
    handleError(err: Error): boolean;
    saveArticle(article: ArticleInterface): boolean;
    getSpiderInfo(): SpiderInfo;
    run(): boolean;
    runFetch(): boolean | string;
    pause(): boolean | string;
    restart(): boolean | string;
    init(): boolean | string;
    create(): object;
    parseTime(site: SITE): string;
    parseLink($: Cheerio, res: Request, column: string);
    handleAllLinks(): void;
}
const taskStack:object = {};
class Spider implements SpiderInterface {
    // site:{};
    site: SITE | object;
    log: object;
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
        let name = site.name;
        taskStack[name] = this;
    }
    fetchPage(url: string): Cheerio { return; };
    parseSiteHead(document: Cheerio): object { return {}; };
    parseArticle(document: Cheerio, column: string): ArticleInterface { return; };
    handleError(err: Error): boolean { return true; };
    saveArticle(article: ArticleInterface): boolean { return true; };
    getSpiderInfo(): SpiderInfo { return; };
    run(): boolean {return true;};
    runFetch(): boolean | string { return '';};
    pause(): boolean | string {return '';};
    restart(): boolean | string {return '';};
    init(): boolean | string {return ;};
    create(): object { return; };
    parseTime(site: SITE): string { return; };
    parseLink($: Cheerio, res: Request, column: string): string { return };
    handleAllLinks(): void { };
}

module.exports = { Spider };
