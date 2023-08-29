import upload2s3 from "./app/lib/s3client.js";
import dotenv from "dotenv";
dotenv.config();

upload2s3('./public/images', 'c-ronaldo.jpg')
