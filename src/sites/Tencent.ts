import { Spider } from './Spider';
import SITE_CONF from '../config/site.json';
import {Sites, Article} from '../interface/interface';

export class Netease extends Spider {
    constructor(sites: Sites) {
        super(sites);
    }
}
export let tencent = new Netease(SITE_CONF.tencent);
