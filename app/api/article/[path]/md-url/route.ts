import { NextResponse } from "next/server"
import fs from 'fs';
import archiver from 'archiver';
import { listObjects, getObject, upload, getPreSignedUrl } from "../../../../lib/s3client";

const zip = async (path: string) => {
  const output = fs.createWriteStream(`/tmp/${path}.zip`);
  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.pipe(output);
  const files = await listObjects(`${path}/`)
  for (const file of files) {
    const content = await getObject(file)
    archive.append(content, { name: file.replace(`${path}/`, '') })
  }
  await archive.finalize();
  await new Promise((resolve) => {setTimeout(resolve, 100)})
  await upload(`/tmp/${path}.zip`, `${path}.zip`)
  return await getPreSignedUrl(`${path}.zip`)
};

export async function getDownloadPath(path: string) {
  try {
    const content = await getObject(`${path}.zip`)
    return await getPreSignedUrl(`${path}.zip`)
  } catch {
    const downloadPath = zip(path)
    return downloadPath
  }
}

export async function GET(request: Request, { params }: { params: {
  path: string
}}) {
  const path = params.path
  const downloadPath = getDownloadPath(path)
  return NextResponse.json({url: `${process.env.AWS_BUCKET_HOST}/${downloadPath}`})
}