import { VOICES } from "@/utils/const";
import z from "zod";

export const AiSummarizerValidationSchema = z.object({
  text: z
    .string()
    .min(1, "Text is required")
    .max(
      3000,
      "The input text exceeds the maximum allowed length of 3000 characters."
    ),
  context: z.string().optional(),
  voiceId: z
    .enum(VOICES, {
      message: `Invalid VoiceId. Please select a valid voice. ${VOICES.join(
        ", "
      )}`,
    })
    .optional(),
});

export type TAiSummarizerSchema = z.infer<typeof AiSummarizerValidationSchema>;
