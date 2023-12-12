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

export const adjustUploadInsert = (
  dataUrl: string, 
  callback: (string: string) => void): void => {

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const image = new Image
  image.src = (dataUrl)  

  image.onload = () => {
    const adjustedWidth = image.width <= 600
      ? image.width
      : 600

    const aspectRatio = image.width / image.height
    const newHeight = adjustedWidth / aspectRatio
    
    canvas.width = adjustedWidth
    canvas.height = newHeight

    ctx?.drawImage(image, 0, 0, adjustedWidth, newHeight)

    const resizedImage = canvas.toDataURL('image/jpeg')
    
    callback(resizedImage.split(',')[1])
  }
}

export const requestUpload = async(
  encodedImage: string,
  date: Date
): Promise<JSON> => {
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
    const json = await res.json()
    return json
  } else {
    console.error('there has been a problem with your upload')
    return await res.json()
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
