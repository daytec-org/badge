import { readFileSync } from "node:fs";
import path from "node:path";

export default function resFavicon() {
  const favicon = readFileSync(path.resolve("public/favicon.svg"), "utf-8");

  return new Response(favicon, {
    status: 200,
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
    },
  });
}
