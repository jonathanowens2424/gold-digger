import path from "node:path";
import fs from "node:fs/promises";

export async function getData() {
  try {
    const pathJSON = path.join("data", "purchases.json");
    const data = await fs.readFile(pathJSON, "utf8");
    const parsedJSON = JSON.parse(data);
    return parsedJSON;
  } catch (err) {
    return [];
  }
}
