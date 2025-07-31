import { RouterContext } from "jsr:@oak/oak";
import { logger } from '~/src/utils/logger.ts';
import { logLevels } from '~/src/utils/logger.ts'

type TLogLevelParam = { level: string };

export const handleLogs = async (ctx: RouterContext<"/logs/:level", TLogLevelParam>) => {
  const { level } = ctx.params;

  if (!logLevels.includes(level)) {
    ctx.response.status = 400;
    ctx.response.body = "Invalid log level";
    return;
  }

  const content = await logger.get(level);
  ctx.response.status = 200;
  ctx.response.headers.set("Content-Type", "text/plain");
  ctx.response.body = content;
};
