import { type Request } from "jsr:@oak/oak";

export function requestLog(text: string, req: Request, name?: string) {
  const timestamp = new Date().toJSON().slice(0, 19);
  const agent = (() => {
    const ua = req.headers.get("sec-ch-ua");
    return (
      (ua &&
        ua.split(",").pop()?.trim().replaceAll('"', "")?.replace(";v=", " ")) ||
      null
    );
  })();

  console.log(
    `${timestamp} \x1b[96m${text}\x1b[0m request${
      name ? ` from \x1b[33m${name}\x1b[0m` : ""
    } (${agent})`
  );
}
