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

export const requestUpload = async(
  encodedImage: string,
  date: Date
) => {
  const reqPack = JSON.stringify({
    encodedImage,
    date
  })
  const res = await fetch('/api/blog/upload-image', {
    method: 'POST',
    body: reqPack,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if(res.ok) {
    console.log('s3 response API page => ', res)
    const json = await res.json()
    console.log('s3 res after .json => ', json)
    return json
  } else {
    console.log('more error stuff here? => ', res)
    console.error('there has been a problem with your upload')
  }
}

export const uploadToS3 = async(buffer: Buffer, date: Date): Promise<string> => {
  const uploadedImage = await s3.upload({
    Bucket: process.env.S3_BUCKET_NAME as string,
    Key: `${date}_${getUUID()}`,
    Body: buffer,
    ContentType: 'image/jpeg'
  }).promise()
  console.log('from horses mouth => ', uploadedImage.Location)
  return uploadedImage.Location
}
