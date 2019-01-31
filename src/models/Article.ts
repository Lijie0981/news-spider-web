import crypto from "crypto";
import mongoose from "mongoose";

export type articleModel = mongoose.Document & {
    
};

const acticleSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    facebook: String,
    twitter: String,
    google: String,
    tokens: Array,

    profile: {
        name: String,
        gender: String,
        location: String,
        website: String,
        picture: String
    }
}, { timestamps: true });

const Article = mongoose.model("Article", acticleSchema);
export default Article;
