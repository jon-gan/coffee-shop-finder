import * as http from "http";
import * as express from "express";
import app from "./app";

const port: number = parseInt(process.env.PORT) || 3000;
const server = http.createServer(app);
server.listen(port);

server.on("error", (err: NodeJS.ErrnoException) : void => {
    throw err;
});

server.on("listening", () : void => {
    console.log("Listening on port " + server.address().port + ".");
});