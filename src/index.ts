import bluebird from "bluebird";
import session from "express-session";
import mongo from "connect-mongo";
import mongoose from "mongoose";
import DBCONF from './config/db.json';
import express from "express";
import { people } from './sites/People';
import SITE_CONF from './config/site.json';
import cheerio from 'cheerio';
