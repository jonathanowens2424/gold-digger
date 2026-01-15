export default function sendResponse(res, statusCode, contentType, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", contentType);
  // set the various Headers
  // setInterval => call generateGoldPrice
  // then use res.write to json.stringify an object containing the new gold price
  // in the frontend code, create an EventSource(),
  res.end(payload);
}
