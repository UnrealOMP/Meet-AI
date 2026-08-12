import { config } from "dotenv";
import { resolve } from "path";
import {
  CreateBucketCommand,
  HeadBucketCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

const region = process.env.AWS_REGION ?? "ap-south-1";
const bucket = process.env.AWS_S3_BUCKET ?? process.env.AWS_S3_BUCKET_NAME;

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  console.error("Missing AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY");
  process.exit(1);
}

if (!bucket || bucket === "YOUR_BUCKET_NAME") {
  console.error("Set AWS_S3_BUCKET to a unique bucket name in .env");
  process.exit(1);
}

const client = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const folders = ["audio/", "transcripts/"];

try {
  await client.send(new HeadBucketCommand({ Bucket: bucket }));
  console.log(`Bucket already exists: ${bucket} (${region})`);
} catch {
  const input =
    region === "us-east-1"
      ? { Bucket: bucket }
      : {
          Bucket: bucket,
          CreateBucketConfiguration: { LocationConstraint: region },
        };

  await client.send(new CreateBucketCommand(input));
  console.log(`Created bucket: ${bucket} (${region})`);
}

for (const folder of folders) {
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: folder,
      Body: "",
    })
  );
  console.log(`Created folder: s3://${bucket}/${folder}`);
}

console.log("Done.");
