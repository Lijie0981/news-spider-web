import { Document, Schema, Model, model } from 'mongoose';
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
const ArticleSchema: Schema = new Schema({
    url: { type: String },
    time: { type: Number },
    content: { type: String },
    title: { type: String },
    info: { type: String },
    site: { type: String },
    column: { type: String },
    type: { type: String },
    imgSrc: { type: String }
});
export const Article: Model<ArticleInterface> = model<ArticleInterface>("Article", ArticleSchema);
module.exports = Article;
