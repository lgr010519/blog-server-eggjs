const Service = require('egg').Service;

class AboutService extends Service {
    async index(params) {
        const {ctx} = this;
        const data = await ctx.model.About.findOne()
        return {
            data,
            msg: '关于信息获取成功',
        };
    }

    async create(params) {
        const {ctx} = this;
        const totalCount = await ctx.model.About.find().countDocuments();
        if (totalCount === 0) {
            const data = {
                ...params,
                createTime: ctx.helper.moment().unix(),
            };
            const res = await ctx.model.About.create(data);
            return {
                msg: '关于信息添加成功',
                data: res,
            };
        } else {
            return {
                msg: '关于信息已存在',
            };
        }
    }

    async update(params) {
        const {ctx} = this;
        const oldAbout = await ctx.model.About.findOne({
            _id: params.id,
        });
        if (oldAbout) {
            const updateTime = new Date().getTime()
            const updateData = {
                createTime: oldAbout.createTime,
                updateTime,
                ...params,
            };
            // console.log(updateData.updateTime)
            const res = await ctx.model.About.findByIdAndUpdate({
                _id: params.id,
            }, updateData, {
                new: true,
                runValidators: true,
            });
            // console.log('res', res)
            return {
                msg: '关于信息修改成功',
                data: res,
            };
        } else {
            return {
                msg: '关于信息不存在',
            };
        }
    }
}

module.exports = AboutService;
