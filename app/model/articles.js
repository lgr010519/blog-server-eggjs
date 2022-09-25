module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const ArticlesSchema = new Schema({
        title: {
            type: String,
            min: 2,
            max: 200,
        },
        cover: {
            type: String,
        },
        introduction: {
            type: String,
            min: 10,
            max: 500,
        },
        categories: {
            type: String,
        },
        tags: {
            type: 'array',
            itemType: String,
        },
        content: {
            type: String,
        },
        views: {
            type: Number,
            default: 0,
        },
        comment: {
            type: Number,
            default: 0,
        },
        like: {
            type: Number,
            default: 0,
        },
        collect: {
            type: Number,
            default: 0,
        },
        isComment: {
            type: Boolean,
            default: true,
        },
        isLike: {
            type: Boolean,
            default: true,
        },
        isCollect: {
            type: Boolean,
            default: false,
        },
        isReward: {
            type: Boolean,
            default: false,
        },
        status: {
            type: Number,
            default: 1,
        },
        publishStatus: {
            type: Number,
            default: 2,
        },
        createTime: {
            type: Number,
            default: 0,
        },
        updateTime: {
            type: Number,
            default: 0,
        }
    }, {
        collection: 'articles',
        versionKey: false,
    });

    return mongoose.model('articles', ArticlesSchema);
};