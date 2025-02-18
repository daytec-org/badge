import { readFileSync } from "node:fs";
import path from "node:path";

export default function getIcon(name: string) {
  const icon = readFileSync(path.resolve("public", name), "utf-8");

  return icon;
}
