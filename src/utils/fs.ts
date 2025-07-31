export const joinPaths = (...parts: string[]) => parts.map(p => p.replace(/[/\\]+/g, "/")).filter(p => p).join("/");

export const fileExists = (path: string): Promise<boolean> => Deno.stat(path).then(() => true).catch(() => false);

export const readTextFile = (path: string): Promise<string> => Deno.readTextFile(path).catch(() => "");
