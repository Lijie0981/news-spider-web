import cheerio from 'cheerio';
import request from 'request';
import debug from 'debug';
import { Site, Article } from '../interface/interface';
import iconv from 'iconv-lite';
import mongoose from "mongoose";
export class Spider {
    site: Site;
    log: Function;
    constructor(site: Site) {
        this.site = site;
        this.log = debug(`spider:${this.site.name}`);
    }
    async getPageContent(url: string) {
        let res = await new Promise<any>((res, rej) => {
            request({ uri: url, encoding: null }, (err, response, body) => {
                if (err) {
                    rej(err);
                }
                else {
                    let resData = {
                        body: iconv.decode(body, 'gbk'),
                        response
                    };
                    res(resData);
                }
            });
        });
        this.log('res header', res.response.headers);
        if (res.body) {
            return cheerio.load(res.body);
        }
        let emptyPage = '<html></html>';
        return cheerio.load(emptyPage);
    }
    createDatabase() {

    }
    setSubSites(subSite: Object) {
        this.site.subSite = subSite;
        // TODO write into database
    }
    setArticle(acticle: Article) {
        // TODO write into database
    }
    run () {}
    pause () {}
}
