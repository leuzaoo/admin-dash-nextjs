import multiparty from "multiparty";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const bucketName = "aitrend-admin-panel";

export default async function handle(req, res) {
  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
  console.log("length:", files.file.length);
  const client = new S3Client({
    region: "us-east-2",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  for (const file of files.file) {
    const ext = file.originalFilename.split(".").pop();
    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: "",
      })
    );
  }
  return res.json("ok");
}

export const config = {
  api: { bodyParser: false },
};
