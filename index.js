import url from 'url';
import getThreadContent from './scrape.js';
import writefile from './writefile.js';

const main = async urlString => {
  // auth_token = '890fc2bd33a605d8ae952f93472946cd4d02a0f9'
  const path = url.parse(urlString).pathname.split('/').pop();
  const threadContent = await getThreadContent(urlString);
  writefile(`thread_${path}`, threadContent);
};

// 获取传递的命令行参数
const args = process.argv.slice(2);

// 判断是否有传递URL作为参数
if (args.length === 0) {
  console.error('Please provide a Twitter URL as a command-line argument.');
  process.exit(1); // 退出进程，表示出现错误
}

// 获取URL参数
const twitterUrl = args[0];

main(twitterUrl)
