import { init, getCommentsCount } from 'twikoo'

if (window.config?.comment) {
  const config = window.config.comment.twikoo
  if (config) {
    init({
      envId: config.envId,
      region: config.region,
      el: '#twikoo',
      path: window.TWIKOO_MAGIC_PATH || window.location.pathname, // 用于区分不同文章的自定义 js 路径，如果您的文章路径不是 location.pathname，需传此参数
      lang: 'zh-CN', // 用于手动设定评论区语言，支持的语言列表 https://github.com/twikoojs/twikoo/blob/main/src/client/utils/i18n/index.js
      pageSize: config.pageSize || 10, // 每页显示的评论数
      includeReply: config.includeReply || true, // 是否在评论中包含回复
      
    onCommentLoaded: function () {
      console.log('评论加载完成');
    },
    }).then(function () {
      console.log('Twikoo 加载完成')
    })
    // init(config)
    // if (config.commentCount) {
    //   // https://twikoo.js.org/api.html#get-comments-count
    //   getCommentsCount({
    //     envId: config.envId,
    //     region: config.region,
    //     urls: [
    //       window.location.pathname
    //     ],
    //     includeReply: true
    //   }).then(function (response) {
    //     // example: [
    //     //   { url: '/2020/10/post-1.html', count: 10 },
    //     //   { url: '/2020/11/post-2.html', count: 0 },
    //     //   { url: '/2020/12/post-3.html', count: 20 }
    //     // ]
    //     // If there is an element with id="twikoo-comment-count", set its innerHTML to the count of comments
    //     const twikooCommentCount = document.getElementById('twikoo-comment-count')
    //     if (twikooCommentCount) twikooCommentCount.innerHTML = response[0].count
    //   })
    // }
  }
}
