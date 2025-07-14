import "dotenv/config";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { OpenAI } from "openai";
import { uploadAndSign } from "./utils/uploadToS3";
import { synthesizeSpeech } from "./utils/speak";
import {
  SummarizePayload,
  SummarizeValidationSchema,
} from "./validation/summarize.validation";
import validateResource from "../middleware/validateResource";
import { handleError } from "../middleware/errorHandler";
import { DEFAULT_CONTEXT } from "./utils/const";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const reqBody = JSON.parse(event.body as string) as SummarizePayload;

  try {
    validateResource(SummarizeValidationSchema, reqBody);

    const { text, context, voiceId } = reqBody;

    // Get summary
    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `${context || DEFAULT_CONTEXT}\n\n${text}`,
        },
      ],
    });

    const summary = chat.choices[0].message.content || "No summary.";

    const audioBuffer = await synthesizeSpeech({
      text: summary,
      voiceId: voiceId,
    });

    const { signedUrl } = await uploadAndSign(audioBuffer);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5173",
      },
      body: JSON.stringify({ summary, audioUrl: signedUrl }),
    };
  } catch (error) {
    return handleError(error);
  }
};
