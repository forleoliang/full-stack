import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext Cloudflare 适配配置
 * 部署到 Cloudflare Workers 时由 `opennextjs-cloudflare build` 读取
 * 如需增量缓存 / ISR，可在此接入 R2 或 KV incrementalCache
 */
export default defineCloudflareConfig({});
