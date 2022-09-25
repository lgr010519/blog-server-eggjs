const Service = require('egg').Service;

class HfService extends Service {
    async index() {
        const {ctx} = this;
        const data = await ctx.model.Config.Hf.findOne()
        return {
            data,
            msg: 'Header/Footer配置信息获取成功',
        };
    }

    async create(params) {
        const {ctx} = this;
        const totalCount = await ctx.model.Config.Hf.find().countDocuments();
        if (totalCount === 0) {
            const data = {
                ...params,
                createTime: ctx.helper.moment().unix(),
            };
            const res = await ctx.model.Config.Hf.create(data);
            return {
                msg: 'Header/Footer配置信息添加成功',
                data: res,
            };
        } else {
            return {
                code: 201,
                msg: 'Header/Footer配置信息已存在',
            };
        }
    }

    async update(params) {
        const {ctx} = this;
        const oldHf = await ctx.model.Config.Hf.findOne({
            _id: params.id,
        });
        if (oldHf) {
            const updateTime = new Date().getTime()
            const updateData = {
                createTime: oldHf.createTime,
                updateTime,
                ...params,
            };
            // console.log(updateData.updateTime)
            const res = await ctx.model.Config.Hf.findByIdAndUpdate({
                _id: params.id,
            }, updateData, {
                new: true,
                runValidators: true,
            });
            // console.log('res', res)
            return {
                msg: 'Header/Footer配置信息修改成功',
                data: res,
            };
        } else {
            return {
                code: 201,
                msg: 'Header/Footer配置信息不存在',
            };
        }
    }
}

module.exports = HfService;
