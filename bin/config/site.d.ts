export interface SITE {
    name: string;
    index: string;
    htmlClass: htmlClass;
    subLinks: object;
    subSite?: [];
    key: string;
    sourceTimeReg?: object;
    pageLinks?: object;
    articles?: object;
}
interface htmlClass {
    header: string;
}
interface SITE_LIST {
    [key: string]: SITE;
}
export declare let sitelist: SITE_LIST;
export {};
