import { getData } from "../util/getData.js";
import sendResponse from "../util/sendResponse.js";
//handleGet
export async function handleGet(res) {
  const data = getData();
  const content = JSON.stringify(data);
  sendResponse(res, 200, "application/json", content);
}

//handlePost

export async function handlePost(req, res) {
  console.log("POST request received.");
}
