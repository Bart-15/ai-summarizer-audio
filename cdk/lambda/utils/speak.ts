import {
  PollyClient,
  SynthesizeSpeechCommand,
  VoiceId,
} from "@aws-sdk/client-polly";
import { Readable } from "stream";
import { Buffer } from "buffer";

const polly = new PollyClient({});

/**
 * Synthesizes speech from text using AWS Polly.
 *
 * @param {string} text the text to synthesize
 * @returns {Promise<Buffer>} a promise that resolves to the audio as an MP3 buffer
 */

type SynthesizeSpeechProps = {
  text: string;
  voiceId?: VoiceId;
};
export const synthesizeSpeech = async ({
  text,
  voiceId = "Joanna", // Default voice
}: SynthesizeSpeechProps): Promise<Buffer> => {
  const { AudioStream } = await polly.send(
    new SynthesizeSpeechCommand({
      OutputFormat: "mp3",
      Text: text,
      VoiceId: voiceId,
    })
  );

  const audioChunks: Buffer[] = [];
  for await (const chunk of AudioStream as Readable) {
    audioChunks.push(chunk);
  }

  return Buffer.concat(audioChunks);
};
