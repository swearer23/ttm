export default {
  async headers() {
    return [
      {
        source: '/article/list',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          }
        ],
      },
    ]
  },
}