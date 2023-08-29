import { ListObjectsCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from 'fs';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const getClient = () => {
  const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
  });
  return client
}

export const getPreSignedUrl = async (key) => {
  const client = getClient()
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key
  });

  try {
    const url = await getSignedUrl(client, command, { expiresIn: 3600 });
    return url 
  } catch (err) {
    console.error(err);
    return null
  }
}

export const listObjects = async (prefix) => {
  const client = getClient()
  const command = new ListObjectsCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Prefix: prefix
  });

  try {
    const response = await client.send(command);
    return response.Contents.map((item) => item.Key).filter((item) => item !== `${prefix}`)
  } catch (err) {
    console.error(err);
    return []
  }
}

export const getObject = async (key) => {
  const client = getClient()
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key
  });

  // try {
    const response = await client.send(command);
    return response.Body
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
  // } catch (err) {
  //   console.error(err, key);
  //   return null
  // }
};

export const createFolder = async (foldername) => {
  const client = getClient()
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${foldername}/`
  });

  try {
    const response = await client.send(command);
    console.log('create folder response: ', response);
  } catch (err) {
    console.error(err);
  }
}

export const upload = async (localpath, remotepath) => {
  const client = getClient() 
  const command = new PutObjectCommand({
    Bucket: "rollo-tomasi-personal",
    Key: remotepath,
    Body: fs.createReadStream(localpath),
  });

  try {
    const response = await client.send(command);
    return true
  } catch (err) {
    console.error(err);
    return false
  }
};

