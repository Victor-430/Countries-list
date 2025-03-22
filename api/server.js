// api/server.js
import { createServer } from "http";
import jsonServer from "json-server";
import path from "path";
import { fileURLToPath } from "url";

// Convert ESM file path to dirname (since you're using "type": "module")
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(data);

// Path to db.json
const dbPath = path.resolve(__dirname, "data/db.json");

const server = jsonServer.create();
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

server.use(middlewares);

// custom routes
server.use((req, res, next) => {
  // Handle CORS for Vercel deployment
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

server.use(router);

//  Vercel serverless function
export default function handler(req, res) {
  return server(req, res);
}
