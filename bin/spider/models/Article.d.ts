import { Document, Model } from 'mongoose';
export interface ArticleInterface extends Document {
    url: string;
    time: number;
    content: string;
    title: string;
    info: string;
    site: string;
    column: string;
    type: string;
    imgSrc: string;
}
export declare const Article: Model<ArticleInterface>;
