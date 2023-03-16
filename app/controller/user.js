'use strict';

const Controller = require('egg').Controller;
const svgCaptcha = require('svg-captcha')

class UserController extends Controller {
    constructor(ctx) {
        super(ctx);
        this.createRule = {
            email: {
                type: 'string',
                min: 5,
                max: 30,
                format: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            },
            password: {
                type: 'password',
                min: 6,
                max: 20,
                format: /^[A-Za-z0-9_]{6,20}$/,
            },
            // captcha:{
            //     type: 'string',
            // }
        };
        this.registerRule = {
            email: {
                type: 'string',
                min: 5,
                max: 30,
                format: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            },
            nickName: {
                type: 'string',
                min: 5,
                max: 20,
                format: /^[\u4e00-\u9fa5A-Za-z0-9_]{5,20}$/,
            },
            password: {
                type: 'password',
                min: 6,
                max: 20,
                format: /^[A-Za-z0-9_]{6,20}$/,
            },
            confirmPassword: {
                type: 'password',
                compare: 'password',
            },
            // captcha:{
            //     type: 'string',
            // }
        };
        this.queryListParamsRules = {
            page: {
                type: 'string',
                required: false,
                allowEmpty: true,
                default: 1,
            },
            pageSize: {
                type: 'string',
                required: false,
                allowEmpty: true,
                default: 20,
            },
            nickName: {
                type: 'string',
                required: false,
                max: 20,
                allowEmpty: true,
            },
        };
    }

    async index() {
        const {ctx, service} = this;
        const data = ctx.request.query;
        ctx.validate(this.queryListParamsRules, data);
        const res = await service.user.index(data);
        ctx.helper.success({
            ctx,
            res,
        });
    }

    async update() {
        const {ctx, service} = this;
        const data = ctx.request.body;
        const res = await service.user.update(data);
        ctx.helper.success({
            ctx,
            res,
        });
    }

    async destroy() {
        const {ctx, service} = this;
        const id = ctx.params.id;
        const res = await service.user.destroy(id);
        ctx.helper.success({
            ctx,
            res,
        });
    }

    async getUserNum() {
        const {ctx, service} = this;
        const res = await service.user.getUserNum();
        ctx.helper.success({
            ctx,
            res,
        });
    }

    async userLogin() {
        const {ctx, service} = this;
        const data = ctx.request.body;
        ctx.validate(this.createRule, data);
        const res = await service.user.userLogin(data);
        ctx.helper.success({
            ctx,
            res,
        });
    }

    async userRegister() {
        const {ctx, service} = this;
        const data = ctx.request.body;
        ctx.validate(this.registerRule, data);
        const res = await service.user.userRegister(data);
        ctx.helper.success({
            ctx,
            res,
        });
    }

    async userLogout() {
        const {ctx, service} = this;
        const res = await service.user.userLogout();
        ctx.helper.success({
            ctx,
            res,
        });
    }

    async getCaptcha() {
        const {ctx} = this;
        const captcha = svgCaptcha.create({
            size: 4,
            fontSize: 50,
            ignoreChars: 'Ooli',
            width: 100,
            height: 40,
            noise: 3,
            color: true,
            background: '#cc9966',
        });
        ctx.response.type = 'image/svg+xml';
        ctx.helper.success({
            ctx,
            res: {
                data: captcha,
            }
        });
    }
}

module.exports = UserController;
