import "dotenv/config";

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({});

/**
 * Uploads an audio file to S3 and returns the object key and a signed URL for retrieving the audio file.
 * @param audioBuffer The audio file to upload
 * @returns An object with the object key and a signed URL for retrieving the audio file
 */
export const uploadAndSign = async (
  audioBuffer: Buffer
): Promise<{ objectKey: string; signedUrl: string }> => {
  const key = `audio/${uuidv4()}.mp3`;
  const bucketName = process.env.AUDIO_BUCKET_NAME!;

  await s3.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: audioBuffer,
      ContentType: "audio/mpeg",
    })
  );

  const signedUrl = await generateSignedUrl(key, bucketName);

  return { objectKey: key, signedUrl };
};

/**
 * Generates a presigned URL for retrieving an object from S3.
 * @param key - The S3 object key.
 * @param bucketName - The S3 bucket name.
 * @returns A presigned URL that can be used to retrieve the object.
 */
export const generateSignedUrl = async (key: string, bucketName: string) => {
  const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return signedUrl;
};
