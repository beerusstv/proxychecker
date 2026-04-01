const express = require("express");
const { SocksProxyAgent } = require("socks-proxy-agent");
const fetch = require("node-fetch");

const app = express();

const TEST_URL = "http://httpbin.org/ip";
const TIMEOUT_MS = 10000;

async function checkProxy(host, port, username, password) {
  const auth = username && password ? `${username}:${password}@` : "";
  const agent = new SocksProxyAgent(`socks5://${auth}${host}:${port}`);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    await fetch(TEST_URL, { agent, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

// POST /check?proxy=host:port:username:password
app.post("/check", async (req, res) => {
  const { proxy } = req.query;
  if (!proxy) return res.sendStatus(400);

  const [host, port, username, password] = proxy.split(":");
  if (!host || !port) return res.sendStatus(400);

  try {
    await checkProxy(host, port, username, password);
    return res.sendStatus(200);
  } catch {
    return res.sendStatus(400);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy checker running on port ${PORT}`));
