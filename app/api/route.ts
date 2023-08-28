import url from 'url'
import { NextResponse } from 'next/server'
import getThreadContent from '../lib/scrape.js';
import writefile, { makedir } from '../lib/writefile.js';
import { isURLValid } from '../lib/utils';
import { outputPath } from '../lib/const';

export async function GET() {
  return NextResponse.json({ data: `${process.cwd()}` })
}

const validate = (urlString: string): Array<string> | NextResponse => {
  const urlpath = url.parse(urlString).pathname?.split('/');
  if (!urlpath) return NextResponse.json({ error: 'invalid url' }, { status: 400 })
  if (!isURLValid(urlString)) return NextResponse.json({ error: 'invalid url' }, { status: 400 })
  return urlpath
}

export async function POST(request: Request) {
  const body = await request.json()
  const urlString = body.url
  const urlpath = validate(urlString)
  if (urlpath instanceof NextResponse) return urlpath
  const userid = urlpath[1];
  const path = urlpath.pop();
  const foldername = `thread_${path}`
  makedir(`${outputPath}${foldername}`);
  const threadContent = await getThreadContent(urlString, userid, foldername);
  writefile(`${foldername}/thread.md`, threadContent);
  return NextResponse.json({ mdURL: `${foldername}` })
}
