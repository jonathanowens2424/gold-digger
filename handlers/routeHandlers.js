import { getData } from "../util/getData.js";
import sendResponse from "../util/sendResponse.js";
import parseJSONBody from "../util/parseJSONBody.js";
//handleGet
export async function handleGet(res) {
  const data = getData();
  const content = JSON.stringify(data);
  sendResponse(res, 200, "application/json", content);
}

//handlePost

export async function handlePost(req, res) {
  const rawBody = await parseJSONBody(req);
  console.log(rawBody);
  sendResponse(
    res,
    200,
    "application/json",
    JSON.stringify({
      success: true,
      message: "Investment recorded",
    }),
  );
}
