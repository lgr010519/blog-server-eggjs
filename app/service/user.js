const Service = require('egg').Service;

class UserService extends Service {
    async index(params) {
        const {ctx} = this;
        const page = params.page * 1;
        const pageSize = params.pageSize * 1;
        params = ctx.helper.filterEmptyField(params);

        // nickName 模糊查询
        const queryCon = params.nickName ? {
            nickName: {
                $regex: new RegExp(params.nickName, 'i'), // i:不区分大小写
            },
        } : {};
        const totalCount = await ctx.model.User.find(queryCon).countDocuments();
        const data = await ctx.model.User.find(queryCon).sort({
            loginTime: -1,
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

    async update(data) {
        const {ctx} = this;
        ctx.helper.genSaltPassword(data.password).then(async hash => {
            data.password = hash;
            await ctx.model.User.updateOne({email: data.email},data);
        });
        const res = await ctx.model.User.findOne({email: data.email});
        return {
            userInfo: res,
            msg: '用户信息修改成功',
        };
    }

    async destroy(id) {
        const {ctx} = this;
        const oldUser = await ctx.model.User.findOne({_id: id});
        if (!oldUser) {
            return {
                code: 201,
                msg: '用户不存在',
            };
        }
        await ctx.model.User.deleteOne({_id: id});
        return {
            msg: '用户删除成功',
        };
    }

    async getUserNum() {
        const {ctx} = this;
        const userNum = await ctx.model.User.find();
        return {
            data: {
                userNum,
            },
            msg: '查询成功',
        };
    }

    async userLogin(params) {
        const {ctx, app} = this;
        const oldUser = await ctx.model.User.findOne({
            email: params.email,
        });
        if (!oldUser) {
            return {
                code: 201,
                msg: '用户不存在',
            };
        }
        const isMatch = await ctx.helper.comparePassword(params.password, oldUser.password);
        if (!isMatch) {
            return {
                code: 201,
                msg: '邮箱或密码错误',
            };
        }
        const token = app.jwt.sign({...oldUser}, app.config.jwt.secret, {
            expiresIn: '1h',
        });
        ctx.cookies.set('token', token, {
            maxAge: 86400000,
            httpOnly: true,
        });

        return {
            data: {
                token,
                userInfo: oldUser,
            },
            msg: '登录成功',
        };
    }

    async userRegister(params) {
        const {ctx} = this;
        const oldUser = await ctx.model.User.findOne({
            email: params.email,
        });
        if (oldUser) {
            return {
                code: 201,
                msg: '该邮箱已被注册',
            };
        }else {
            ctx.helper.genSaltPassword(params.password).then(async hash => {
                params.password = hash;
                const oldUser = await ctx.model.User.find({email: params.email});
                if (oldUser.length === 0) {
                    await ctx.model.User.create(params);
                }
            });
        }

        return {
            msg: '注册成功',
        };
    }

    async userLogout() {
        const {ctx} = this;
        ctx.cookies.set('token', '', {
            maxAge: 0,
        });

        return {
            msg: '退出登录成功',
        };
    }
}

module.exports = UserService;
