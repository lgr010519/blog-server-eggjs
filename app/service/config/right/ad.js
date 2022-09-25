const Service = require('egg').Service;

class RightAdService extends Service {
    async index() {
        const {ctx} = this;
        const data = await ctx.model.Config.Right.Ad.findOne()
        return {
            data,
            msg: '广告设置信息获取成功',
        };
    }

    async create(params) {
        const {ctx} = this;
        const totalCount = await ctx.model.Config.Right.Ad.find().countDocuments();
        if (totalCount === 0) {
            const data = {
                ...params,
                createTime: ctx.helper.moment().unix(),
            };
            const res = await ctx.model.Config.Right.Ad.create(data);
            return {
                msg: '广告设置信息添加成功',
                data: res,
            };
        } else {
            return {
                code: 201,
                msg: '广告设置信息已存在',
            };
        }
    }

    async update(params) {
        const {ctx} = this;
        const oldAd = await ctx.model.Config.Right.Ad.findOne({
            _id: params.id,
        });
        if (oldAd) {
            const updateTime = new Date().getTime()
            const updateData = {
                createTime: oldAd.createTime,
                updateTime,
                ...params,
            };
            // console.log(updateData.updateTime)
            const res = await ctx.model.Config.Right.Ad.findByIdAndUpdate({
                _id: params.id,
            }, updateData, {
                new: true,
                runValidators: true,
            });
            // console.log('res', res)
            return {
                msg: '广告设置信息修改成功',
                data: res,
            };
        } else {
            return {
                code: 201,
                msg: '广告设置信息不存在',
            };
        }
    }
}

module.exports = RightAdService;
