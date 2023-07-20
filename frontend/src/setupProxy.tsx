import { Express } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app: Express) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://127.0.0.1:8000",
            changeOrigin: true,
        })
    );
};
