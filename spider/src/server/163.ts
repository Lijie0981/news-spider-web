import cheerio from 'cheerio';
import request from 'superagent';
import debug from 'debug';
import fs from 'fs';
import path from 'path';
import _ from 'lodash'
let link = {index:'https://news.163.com/'};
let className = {head:'.ns_area.list ul'};

const log = debug('spider:163');
require('superagent-charset')(request);

async function getHeadLinks(link = {index: ''}) {
    log('163 config', link);
    let res = await request.get(link.index).charset('gbk');
    log(res.status);
    if (res.status === 200) {
        const $ = cheerio.load(res.text);
        let headLinks = {};
        log($(className.head)[0].children.length)
        $(className.head)[0].children.filter(item => item.name).forEach(element => {
            let $element = $(element).find('a');
            let href = $element.attr('href');
            let text = $element.text();
            headLinks[text] = href;
        });
        return _.extend(link, headLinks);
    }
};

function writeJson({ key, value, path }) {
    log(path);
    let content = JSON.parse(fs.readFileSync(path, 'utf8'));
    log('json read', content);
    if (key && content) {
        content[key] = value;
    } else {
        content = value;
    }
    fs.writeFileSync(path, JSON.stringify(content));
}

async function server() {
    let a = await getHeadLinks(link);
}
export default { server };
