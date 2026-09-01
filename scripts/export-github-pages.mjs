import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";

const basePath = "/koiboi";
const output = new URL("../docs/", import.meta.url);
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("export", Date.now().toString());

const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("http://localhost/", { headers: { accept: "text/html" } }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) {
  throw new Error(`Static export failed with status ${response.status}`);
}

let html = await response.text();
html = html
  .replace(/<script\b[\s\S]*?<\/script>/gi, "")
  .replace(/<link\b[^>]*rel=["']modulepreload["'][^>]*>/gi, "")
  .replace(/(href|src|content)=(['"])\/(?!\/)/g, `$1=$2${basePath}/`)
  // inline <style> blocks (the font faces) carry url(/assets/...) that the attribute rule above misses
  .replace(/url\(\/(?!\/)/g, `url(${basePath}/`);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(new URL("../dist/client/", import.meta.url), output, { recursive: true });

const assetFiles = await readdir(new URL("assets/", output));
const cssFile = assetFiles.find((file) => /^index-.*\.css$/.test(file));
if (!cssFile) {
  throw new Error("Compiled stylesheet was not found");
}

const cssUrl = new URL(`assets/${cssFile}`, output);
const css = (await readFile(cssUrl, "utf8")).replaceAll("/assets/", `${basePath}/assets/`);
await writeFile(cssUrl, css);
await writeFile(new URL("index.html", output), html);
await writeFile(new URL(".nojekyll", output), "");
