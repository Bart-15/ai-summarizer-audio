import "dotenv/config";

import {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({});

export const handler = async () => {
  const bucketName = process.env.AUDIO_BUCKET_NAME!;
  console.log("bucketName", bucketName);
  const { Contents } = await s3.send(
    new ListObjectsV2Command({ Bucket: bucketName })
  );

  if (!Contents || Contents.length === 0)
    return { status: "No files to delete" };

  for (const item of Contents) {
    await s3.send(
      new DeleteObjectCommand({ Bucket: bucketName, Key: item.Key! })
    );
  }

  return { status: "Deleted", count: Contents.length };
};
