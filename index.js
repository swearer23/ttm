import url from 'url';
import getThreadContent from './scrape.js';
import writefile, { makedir } from './writefile.js';
import { getThreadURLArg } from './utils.js';

const main = async () => {
  const urlString = await getThreadURLArg();
  // auth_token = '890fc2bd33a605d8ae952f93472946cd4d02a0f9'
  const urlpath = url.parse(urlString).pathname.split('/');
  const userid = urlpath[1];
  const path = urlpath.pop();
  const foldername = `thread_${path}`
  makedir(`output/${foldername}`);
  const threadContent = await getThreadContent(urlString, userid, foldername);
  writefile(`${foldername}/thread.md`, threadContent);
};

main()
