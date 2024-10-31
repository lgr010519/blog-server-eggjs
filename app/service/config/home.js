const Service = require('egg').Service;

class HomeService extends Service {
  async index() {
    const {ctx} = this;
    const data = await ctx.model.Config.Home.findOne()
    return {
      data,
      msg: '首页配置信息获取成功',
    };
  }

  async create(params) {
    const {ctx} = this;
    const totalCount = await ctx.model.Config.Home.find().countDocuments();
    if (totalCount === 0) {
      const data = {
        ...params,
        createTime: ctx.helper.moment().unix(),
      };
      const res = await ctx.model.Config.Home.create(data);
      return {
        msg: '首页配置信息添加成功',
        data: res,
      };
    } else {
      return {
        code: 201,
        msg: '首页配置信息已存在',
      };
    }
  }

  async update(params) {
    const {ctx} = this;
    const oldHome = await ctx.model.Config.Home.findOne({
      _id: params.id,
    });
    if (oldHome) {
      const updateTime = new Date().getTime()
      const updateData = {
        createTime: oldHome.createTime,
        updateTime,
        ...params,
      };
      // console.log(updateData.updateTime)
      const res = await ctx.model.Config.Home.findByIdAndUpdate({
        _id: params.id,
      }, updateData, {
        new: true,
        runValidators: true,
      });
      // console.log('res', res)
      return {
        msg: '首页配置信息修改成功',
        data: res,
      };
    } else {
      return {
        code: 201,
        msg: '首页配置信息不存在',
      };
    }
  }
}

module.exports = HomeService;
