module.exports = () => {
  return {
    schedule: {
      cron: '0 */30 * * * *', // 每30分钟执行一次
      // interval: '10s', // 10秒间隔
      type: 'all', // 指定所有的 worker 都需要执行
    },
    async task(ctx) {
      console.log('审核通过')
      await ctx.model.Comment.updateMany({
        auditStatus: '3',
      }, {
        auditStatus: '1',
        auditTime: ctx.helper.moment().unix()
      })
    },
  }
};
