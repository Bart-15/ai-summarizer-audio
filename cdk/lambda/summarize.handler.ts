import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body || "{}");
  const inputText = body.text;

  if (!inputText) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing 'text' field in request body" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Received your text!",
      preview: inputText.slice(0, 100) + "...",
    }),
  };
};
