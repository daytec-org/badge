import resFavicon from "./src/utils/favicon.ts";
import { badgeSimple } from "./src/badge/simple.ts";
import { requestLog } from "./src/utils/log.ts";

const PORT = Number(Deno.env.get("APP_PORT"));

const routes = {
  simple: {
    pattern: new URLPattern({ pathname: "/simple/:id" }),
    badge: badgeSimple,
  },
};

const handler = async (req: Request) => {
  const url = new URL(req.url);
  console.log("Path:", url.pathname);
  console.log("Query parameters:", url.searchParams.toString());
  console.log("Method:", req.method);

  if (req.body) {
    const body = await req.json();
    console.log("Body:", body);
  }

  if (url.pathname === "/favicon.ico") {
    return resFavicon();
  }

  // Routing :)
  for (const { pattern, badge } of Object.values(routes)) {
    const match = pattern.exec(req.url);
    if (match) {
      const id = match.pathname.groups.id;
      if (id) {
        requestLog(`Badge (${id})`, req);
        const title = url.searchParams.get("title") ?? undefined;
        const color = url.searchParams.get("color") ?? undefined;
        return new Response(badge(title, color), {
          status: 200,
          headers: {
            "content-type": "image/svg+xml; charset=utf-8",
          },
        });
      }
    }
  }

  return new Response("Not found", { status: 404 });
};

Deno.serve({ port: PORT, hostname: "127.0.0.1" }, handler);
