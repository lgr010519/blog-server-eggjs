const Service = require('egg').Service;

class ArticlesService extends Service {

    async updateCategoriesArticleNum() {
        const {ctx} = this;
        const categories = await ctx.model.Categories.find()
        if (categories && categories.length > 0) {
            categories.forEach(async item => {
                const articleNum = await ctx.model.Articles.find({
                    categories: item.name,
                    status: 1,
                    publishStatus: 1,
                }).countDocuments()
                await ctx.model.Categories.update({
                    name: item.name
                }, {
                    articleNum
                })
            })
        }
    }

    async updateTagsArticleNum() {
        const {ctx} = this;
        const tags = await ctx.model.Tags.find()
        if (tags && tags.length > 0) {
            tags.forEach(async item => {
                const articleNum = await ctx.model.Articles.find({
                    tags: {$elemMatch: {$eq: item.name}},
                    status: 1,
                    publishStatus: 1,
                }).countDocuments()
                await ctx.model.Tags.update({
                    name: item.name
                }, {
                    articleNum
                })
            })
        }
    }

    async index(params) {
        const {ctx} = this;
        const page = params.page * 1;
        const pageSize = params.pageSize * 1;
        params = ctx.helper.filterEmptyField(params);

        let mustCon = {}
        if (params.categories) {
            mustCon.categories = params.categories
        }
        if (params.tags) {
            mustCon.tags = {
                $all: params.tags.split(','),
            }
        }
        if (params.status != 0) {
            mustCon.status = params.status
        }
        if (params.publishStatus != 0) {
            mustCon.publishStatus = params.publishStatus
        }

        let timeQuery = ctx.helper.getTimeQueryCon(params)

        // name 模糊查询
        const queryCon = {
            $and: [
                mustCon,
                timeQuery,
                {
                    title: {
                        $regex: params.title ? new RegExp(params.title, 'i') : '', // i:不区分大小写
                    }
                }
            ]
        }
        const totalCount = await ctx.model.Articles.find(queryCon).countDocuments();
        const data = await ctx.model.Articles.find(queryCon).sort({
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
        const oldArticles = await ctx.model.Articles.findOne({
            title: params.title,
        });
        if (oldArticles) {
            return {
                code: 201,
                msg: '该文章已存在',
            };
        }
        const data = {
            ...params,
            createTime: ctx.helper.moment().unix(),
        };
        const res = await ctx.model.Articles.create(data);
        await this.updateCategoriesArticleNum()
        await this.updateTagsArticleNum()
        return {
            msg: '文章添加成功',
            data: res,
        };
    }

    async update(params) {
        const {ctx} = this;
        const oldArticles = await ctx.model.Articles.findOne({
            _id: params.id,
        });
        if (!oldArticles) {
            return {
                code: 201,
                msg: '文章不存在',
            };
        }
        const updateData = {
            // createTime: oldArticles.createTime,
            updateTime: ctx.helper.moment().unix(),
            ...params
        };
        await ctx.model.Articles.updateOne({
            _id: params.id,
        }, updateData);
        await this.updateCategoriesArticleNum()
        await this.updateTagsArticleNum()
        return {
            msg: '文章修改成功',
        };
    }

    async destroy(id) {
        const {ctx} = this;
        const oldArticles = await ctx.model.Articles.findOne({_id: id});
        if (!oldArticles) {
            return {
                code: 201,
                msg: '文章不存在',
            };
        }
        await ctx.model.Articles.deleteOne({_id: id});
        // TODO 更新标签和分类里面的文章数量
        return {
            msg: '文章删除成功',
        };
    }

    async changeStatus(params) {
        const {ctx} = this;
        const oldArticles = await ctx.model.Articles.findOne({_id: params.id});
        if (!oldArticles) {
            return {
                code: 201,
                msg: '文章不存在',
            };
        }
        await ctx.model.Articles.updateOne({
            _id: params.id,
        }, {
            status: params.status,
        });
        return {
            msg: `文章${params.status === 1 ? '启用' : '停用'}成功`,
        };
    }

    async changePublishStatus(params) {
        const {ctx} = this;
        const oldArticles = await ctx.model.Articles.findOne({_id: params.id});
        if (!oldArticles) {
            return {
                code: 201,
                msg: '文章不存在',
            };
        }
        await ctx.model.Articles.updateOne({
            _id: params.id,
        }, {
            publishStatus: params.publishStatus,
        });
        return {
            msg: `文章${params.publishStatus === 1 ? '发布' : '下线'}成功`,
        };
    }

    async changeCollectStatus(params) {
        const {ctx} = this;
        await ctx.model.Articles.updateMany({}, {
            isCollect: params.isCollect,
        });
        return {
            msg: `文章${params.isCollect ? '一键开启' : '一键取消'}成功`,
        };
    }

    async edit(id) {
        const {ctx} = this;
        const oldArticles = await ctx.model.Articles.findOne({_id: id});
        if (!oldArticles) {
            return {
                code: 201,
                msg: '文章不存在'
            }
        }
        return {
            data: oldArticles,
            msg: '文章详情获取成功'
        }
    }
}

module.exports = ArticlesService;
