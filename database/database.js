import mongoose from "mongoose";
import config from "../config/config.js";

const database = mongoose;

const url = config.url

await database.connect(url)

export default database
