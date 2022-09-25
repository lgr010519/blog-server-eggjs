const Service = require('egg').Service;

class RightRecommendService extends Service {
    async index(params) {
        const {ctx} = this;
        const page = params.page * 1;
        const pageSize = params.pageSize * 1;
        params = ctx.helper.filterEmptyField(params);
        const queryCon = params.project ? {project: params.project} : {}
        const totalCount = await ctx.model.Config.Right.Recommend.find(queryCon).countDocuments();
        const data = await ctx.model.Config.Right.Recommend.find(queryCon).sort({
            createTime: -1,
        }).skip((page - 1) * pageSize)
            .limit(pageSize);
        return {
            data: {
                page,
                pageSize,
                totalCount,
                list: data,
            },
        };
    }

    async create(params) {
        const {ctx} = this;
        const totalCount = await ctx.model.Config.Right.Recommend.find({name: params.name}).countDocuments();
        if (totalCount === 0) {
            const data = {
                ...params,
                createTime: ctx.helper.moment().unix(),
            };
            const res = await ctx.model.Config.Right.Recommend.create(data);
            return {
                msg: '推荐设置信息添加成功',
                data: res,
            };
        } else {
            return {
                code: 201,
                msg: '推荐设置信息已存在',
            };
        }
    }

    async update(params) {
        const {ctx} = this;
        const oldRecommend = await ctx.model.Config.Right.Recommend.findOne({
            _id: params.id,
        });
        if (oldRecommend) {
            const updateTime = new Date().getTime()
            const updateData = {
                createTime: oldRecommend.createTime,
                updateTime,
                ...params,
            };
            // console.log(updateData.updateTime)
            const res = await ctx.model.Config.Right.Recommend.findByIdAndUpdate({
                _id: params.id,
            }, updateData, {
                new: true,
                runValidators: true,
            });
            // console.log('res', res)
            return {
                msg: '推荐设置信息修改成功',
                data: res,
            };
        } else {
            return {
                code: 201,
                msg: '推荐设置信息不存在',
            };
        }
    }

    async destroy(id) {
        const {ctx} = this;
        const oldRecommend = await ctx.model.Config.Right.Recommend.findOne({_id: id});
        if (!oldRecommend) {
            return {
                code: 201,
                msg: '推荐设置信息不存在',
            };
        }
        await ctx.model.Config.Right.Recommend.deleteOne({_id: id});
        return {
            msg: '推荐设置信息删除成功',
        };
    }
}

module.exports = RightRecommendService;
