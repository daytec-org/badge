import { Context } from "jsr:@oak/oak/";
import { badgePlain } from "~/src/badge/plain.ts";
import { requestLog } from "~/src/utils/log.ts";

export function plain({ request, response }: Context) {
  requestLog(`Plain badge`, request);

  const url = new URL(request.url);
  const title = url.searchParams.get("title") ?? undefined;
  const color = url.searchParams.get("color") ?? undefined;

  response.type = "image/svg+xml; charset=utf-8";
  response.body = badgePlain(title, color);
}
