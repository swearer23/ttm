import { NextResponse } from "next/server"
import fs from 'fs';
import archiver from 'archiver';

const zip = (path: string) => {
  const tempname = `${process.cwd()}/public/${path}`;
  const output = fs.createWriteStream(`${tempname}.zip`);
  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.pipe(output);
  archive.directory(`${process.cwd()}/public/output/${path}`, false);
  archive.finalize();
  return `${path}.zip`
};

export function getDownloadPath(path: string) {
  try {
    const downloadPath = `${process.cwd()}/public/${path}.zip`
    fs.accessSync(downloadPath)
    return `${path}.zip`
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
  return NextResponse.json({url: downloadPath})
}