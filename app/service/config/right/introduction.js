const Service = require('egg').Service;

class RightIntroductionService extends Service {
    async index() {
        const {ctx} = this;
        const data = await ctx.model.Config.Right.Introduction.findOne()
        return {
            data,
            msg: '个人简介配置信息获取成功',
        };
    }

    async create(params) {
        const {ctx} = this;
        const totalCount = await ctx.model.Config.Right.Introduction.find().countDocuments();
        if (totalCount === 0) {
            const data = {
                ...params,
                createTime: ctx.helper.moment().unix(),
            };
            const res = await ctx.model.Config.Right.Introduction.create(data);
            return {
                msg: '个人简介配置信息添加成功',
                data: res,
            };
        } else {
            return {
                code: 201,
                msg: '个人简介配置信息已存在',
            };
        }
    }

    async update(params) {
        const {ctx} = this;
        const oldIntroduction = await ctx.model.Config.Right.Introduction.findOne({
            _id: params.id,
        });
        if (oldIntroduction) {
            const updateTime = new Date().getTime()
            const updateData = {
                createTime: oldIntroduction.createTime,
                updateTime,
                ...params,
            };
            // console.log(updateData.updateTime)
            const res = await ctx.model.Config.Right.Introduction.findByIdAndUpdate({
                _id: params.id,
            }, updateData, {
                new: true,
                runValidators: true,
            });
            // console.log('res', res)
            return {
                msg: '个人简介配置信息修改成功',
                data: res,
            };
        } else {
            return {
                code: 201,
                msg: '个人简介配置信息不存在',
            };
        }
    }
}

module.exports = RightIntroductionService;
