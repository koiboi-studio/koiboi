import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the complete KOIBOI artist hub", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>KOIBOI MUSIC \| Official Artist Hub<\/title>/i);
  assert.match(html, /KOI<\/span><span>BOI/);
  assert.match(html, /koi\.boibooking@gmail\.com/);
  assert.match(html, /facebook\.com\/profile\.php\?id=61577651219891/);
  assert.match(html, /soundcloud\.com\/koi-boi/);
  assert.match(html, /beatport\.com\/artist\/koi-boi\/230769/);
  assert.match(html, /music\.apple\.com\/us\/artist\/koi-boi\/484391276/);
  assert.doesNotMatch(html, /three-backdrop|data-tilt-window|<canvas/i);

  const trackArticles = html.match(/class="track"/g) ?? [];
  assert.equal(trackArticles.length, 78);
});
