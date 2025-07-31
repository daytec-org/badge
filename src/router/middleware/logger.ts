import type { Middleware, Context } from "jsr:@oak/oak";
import { FileLogger } from '~/src/utils/fileLogger.ts'

const fileLogger = new FileLogger();
const colors = {
  GET: '\x1b[32m', // Green
  POST: '\x1b[34m', // Blue
  PUT: '\x1b[33m', // Yellow
  PATCH: '\x1b[35m', // Magenta
  DELETE: '\x1b[31m', // Red
  error: '\x1b[31m', // Red for errors
  reset: '\x1b[0m', // Reset colors
};

const getFormattedTimestamp = (date = new Date()) => `${date.toISOString().split('T')[0]} ${date.toTimeString().split(' ')[0]}`

function getColoredMethod(method: string): string {
  const upperMethod = method.toUpperCase() as keyof typeof colors;
  const color = colors[upperMethod] || colors.reset;
  return `${color}${upperMethod}${colors.reset}`;
}

function getStatusColor(status: number): string {
  if (status >= 500) return '\x1b[31m';
  if (status >= 400) return '\x1b[33m';
  return '\x1b[32m';
}

export const loggerMiddleware: Middleware = async (ctx: Context, next: () => Promise<unknown>) => {
  const start = Date.now();
  const { method, url } = ctx.request;
  const { pathname, search } = new URL(url);
  const route = search ? `${pathname}${search}` : pathname;
  const timestamp = getFormattedTimestamp()

  await next();

  const duration = Date.now() - start;
  const status = ctx.response.status ?? 500;
  const coloredMethod = getColoredMethod(method);
  const statusColor = getStatusColor(status);

  console.log(`[${coloredMethod}] ${route} ${statusColor}${status}${colors.reset} (${duration}ms)`);

  const logEntry = `[${timestamp}] [${method}] ${route} ${status} (${duration}ms)\n`;
  await fileLogger.log("info", logEntry);
};

export const exceptionFilter: Middleware = async (ctx: Context, next: () => Promise<unknown>) => {
  await next().catch((error: Error) => {
    const timestamp = getFormattedTimestamp();
    const message = error.stack ?? error.message;

    console.error(`${colors.error}${message}${colors.reset}`);

    const logEntry = `[${timestamp}] ${message}\n`;
    fileLogger.log("error", logEntry).catch(() => { });

    ctx.response.status = 500;
    ctx.response.body = { error: "Internal Server Error", info: error.message };
  });
};
