import AWS from 'aws-sdk'
import crypto from 'crypto'

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const getUUID = () => {
  return (String(1e7) + -1e3 + -4e3).replace(/[018]/g, (c) =>
    (Number(c) ^ (crypto.randomBytes(1)[0] & (15 >> (Number(c) / 4)))).toString(16),
  );
};

export const uploadToS3 = async(blob: Blob, date: Date) => {
  const uploadedImage = await s3.upload({
    Bucket: process.env.S3_BUCKET_NAME as string,
    Key: `${date}_${getUUID()}`,
    Body: blob,
    ContentType: 'image/jpeg'
  }).promise()
  return uploadedImage.Location
}
