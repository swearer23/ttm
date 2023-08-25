export const getThreadURLArg = async () => {
  const args = process.argv.slice(2);
  // 判断是否有传递URL作为参数
  if (args.length === 0) {
    console.error('Please provide a Twitter URL as a command-line argument.');
    process.exit(1); // 退出进程，表示出现错误
  }

  // 获取URL参数
  const twitterUrl = args[0];
  return twitterUrl
}