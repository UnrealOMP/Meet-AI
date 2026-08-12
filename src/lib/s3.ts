import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

export const S3_AUDIO_PREFIX = "audio/";
export const S3_TRANSCRIPTS_PREFIX = "transcripts/";

const region = process.env.AWS_REGION ?? "ap-south-1";

export const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const S3_BUCKET = process.env.AWS_S3_BUCKET!;

export function getAudioKey(meetingId: string) {
  return `${S3_AUDIO_PREFIX}${meetingId}.mp3`;
}

export function getTranscriptKey(meetingId: string) {
  return `${S3_TRANSCRIPTS_PREFIX}${meetingId}.txt`;
}

export async function uploadRecordingToS3(
  meetingId: string,
  body: Buffer,
  contentType: string
) {
  const key = getAudioKey(meetingId);
  await s3Client.send(
    new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );
  return key;
}

export async function uploadTranscriptToS3(meetingId: string, text: string) {
  const key = getTranscriptKey(meetingId);
  await s3Client.send(
    new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      Body: text,
      ContentType: "text/plain; charset=utf-8",
    })
  );
  return key;
}

export async function downloadRecordingFromS3(key: string) {
  const response = await s3Client.send(
    new GetObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
    })
  );

  if (!response.Body) {
    throw new Error("Empty S3 object body");
  }

  return Buffer.from(await response.Body.transformToByteArray());
}
