"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var ArticleSchema = new mongoose_1.Schema({
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
exports.Article = mongoose_1.model("Article", ArticleSchema);
module.exports = exports.Article;
