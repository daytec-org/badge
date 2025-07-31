import { RouterContext } from "jsr:@oak/oak";
import { joinPaths, fileExists, readTextFile } from '~/src/utils/fs.ts';
import { logLevels } from '~/src/utils/fileLogger.ts'

type TLogLevelParam = { level: string };

export const handleLogs = async (ctx: RouterContext<"/logs/:level", TLogLevelParam>) => {
  const { level } = ctx.params;

  if (!logLevels.includes(level)) {
    ctx.response.status = 400;
    ctx.response.body = "Invalid log level";
    return;
  }

  const logPath = joinPaths(Deno.cwd(), "logs", `${level}.log`);

  if (!await fileExists(logPath)) {
    ctx.response.status = 404;
    ctx.response.body = "Log file not found";
    return;
  }

  const content = await readTextFile(logPath);
  ctx.response.status = 200;
  ctx.response.headers.set("Content-Type", "text/plain");
  ctx.response.body = content;
};
