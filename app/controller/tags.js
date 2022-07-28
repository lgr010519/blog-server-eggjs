'use strict';

const Controller = require('egg').Controller;

class TagsController extends Controller {
    constructor(ctx) {
        super(ctx);
        this.createRule={
            name: {
                type: 'string',
                min: 2,
                max: 20,
                format: /^[\u4e00-\u9fa5A-Za-z0-9_]{2,20}$/
            }
        }
    }

    async create(){
        const {ctx,service} = this
        const data = ctx.request.body
        ctx.validate(this.createRule,data)
        const res = await service.tags.create(data)
        ctx.helper.success({
            ctx,
            res
        })
    };

    async update(){
        const {ctx,service} = this
        const data = ctx.request.body
        const id = ctx.params.id
        ctx.validate(this.createRule,data)
        const res = await service.tags.update({
            id,
            name: data.name
        })
        ctx.helper.success({
            ctx,
            res
        })
    };
}

module.exports = TagsController;
