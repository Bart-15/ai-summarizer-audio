import z, { object, string, TypeOf } from "zod";
import { VOICES } from "../utils/const";
export const SummarizeValidationSchema = object({
  text: string().max(3000, {
    message:
      "The input text exceeds the maximum allowed length of 3000 characters. Please reduce the text length and try again.",
  }),
  context: string().min(1, { message: "Context is required." }).optional(),
  voiceId: z
    .enum(VOICES, {
      message: `Invalid VoiceId. Please select a valid voice. ${VOICES.join(
        ", "
      )}`,
    })
    .optional(),
});

export type SummarizePayload = TypeOf<typeof SummarizeValidationSchema>;
