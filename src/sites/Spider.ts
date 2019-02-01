import cheerio from 'cheerio';
import request from 'superagent-charset';
import debug from 'debug';
import {Sites, Article} from '../interface/interface';
import mongoose from "mongoose";
export class Spider {
    sites: Sites;
    log: Function;
    constructor(sites: Sites) {
        this.sites = sites;
        this.log = debug(`spider:${this.sites.name}`);
    }
    async getPageContent(url: string) {
        let res = await request.get(url).charset('gbk');
        this.log('spider get page content status', res.status);
        this.log('spider get page content header', res.header);
        if (res.status) {
            return cheerio.load(res.text);
        }
        let emptyPage = '<html></html>';
        return cheerio.load(emptyPage);
    }
    createDatabase() {

    }
    setSubSites(subSite: Object) {
        this.sites.subSite = subSite;
        // TODO write into database
    }
    setArticle(acticle: Article) {
        // TODO write into database
    }
}
