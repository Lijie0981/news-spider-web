export interface Site {
    site: string,
    name: string,
    subSite: Object,
    htmlClass: HtmlClass,
    timeSplit?: string
}
export interface HtmlClass {
    header: string,
    content?: string,
    footer?: string,
    side_left?: string,
    sid_right?: string
}
export interface Article {
    title: string,
    abstract: string,
    img: string,
    timestamp?: Number,
    date: string,
    source?: string
}
