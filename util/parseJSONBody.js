export default async function parseJSONBody(req) {
  let body = "";

  for await (const chunk of req) {
    body += chunk;
  }

  if (!body || body.trim() === "") {
    throw new Error("Request body is empty");
  }

  try {
    return JSON.parse(body);
  } catch (err) {
    throw new Error(`Invalid JSON format: ${err.message}`);
    //              ^                                   ^
    //              Parentheses, not backticks!
  }
}
