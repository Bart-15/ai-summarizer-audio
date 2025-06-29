import "dotenv/config";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { OpenAI } from "openai";
import { uploadAndSign } from "./utils/uploadToS3";
import { synthesizeSpeech } from "./utils/speak";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body || "{}");
  const inputText = body.text;
  const context = body.context || "Summarize this text in 3 sentences.";

  if (!inputText) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing 'text' field in request body" }),
    };
  }

  try {
    // Get summary
    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `${context}\n\n${inputText}`,
        },
      ],
    });

    const summary = chat.choices[0].message.content || "No summary.";

    const audioBuffer = await synthesizeSpeech(summary);

    const { signedUrl } = await uploadAndSign(audioBuffer);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ summary, audioUrl: signedUrl }),
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Something went wrong",
          detail: error.message,
        }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        body: JSON.stringify({ error: (error as Error).message }),
      }),
    };
  }
};
