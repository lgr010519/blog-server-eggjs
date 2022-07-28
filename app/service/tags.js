const Service = require('egg').Service;

class TagsService extends Service {
  async create(params) {
    const { ctx } = this;
    const oldTags = await ctx.model.Tags.findOne({
      name: params.name,
    });
    if (oldTags) {
      return {
        msg: '该标签已存在',
      };
    }
    const data = {
      ...params,
      createTime: ctx.helper.moment().unix(),
    };
    const res = await ctx.model.Tags.create(data);
    return {
      msg: '标签添加成功',
      data: res,
    };
  }
  async update(params) {
    const { ctx } = this;
    const oldTags = await ctx.model.Tags.findOne({
      _id: params.id,
    });
    if (oldTags) {
      const oldNameTags = await ctx.model.Tags.findOne({
        name: params.name,
      });
      if (oldNameTags) {
        return {
          msg: '标签已存在，请重新修改',
        };
      }
    }
    const updateData = {
      // createTime: oldTags.createTime,
      updateTime: ctx.helper.moment().unix(),
      name: params.name,
    };
    await ctx.model.Tags.updateOne({
      _id: params.id,
    }, updateData);
    return {
      msg: '标签修改成功',
    };
  }
}

module.exports = TagsService;
