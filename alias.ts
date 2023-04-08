import path from "path";
import fs from "fs";

const ROOT_PATH = path.resolve(__dirname, ".");
const tsconfig = fs.readFileSync("./tsconfig.json", "utf-8");
const tsPaths = JSON.parse(tsconfig).compilerOptions.paths || {};
const alias: Record<string, string> = {};
Object.keys(tsPaths).forEach((key) => {
  const tsPath = tsPaths[key][0];
  const aliasKey = key.replace("/*", "");
  const aliasPath = tsPath.replace("/*", "");
  if (!tsPath || !aliasKey || !aliasPath) {
    return;
  }
  alias[aliasKey] = path.resolve(ROOT_PATH, aliasPath);
});

export default { ...alias };
