import url from 'url';
import getThreadContent from './scrape.js';
import writefile from './writefile.js';

(async () => {
  // auth_token = '890fc2bd33a605d8ae952f93472946cd4d02a0f9'
  const urlString = 'https://twitter.com/theaipreneursof/status/1684577570690596866';
  const path = url.parse(urlString).pathname.split('/').pop();
  const threadContent = await getThreadContent(urlString);
  writefile(`thread_${path}`, threadContent);
})();
