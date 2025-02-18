import { type Context } from "jsr:@oak/oak/";
import { badgePlain } from "~/src/badge/plain.ts";
import { requestLog } from "~/src/utils/log.ts";

export function plain({ request, response }: Context) {
  requestLog(`Plain badge`, request);

  const title = request.url.searchParams.get("title") ?? undefined;
  const color = request.url.searchParams.get("color") ?? undefined;

  response.type = "image/svg+xml; charset=utf-8";
  response.body = badgePlain(title, color);
}
