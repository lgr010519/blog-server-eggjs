module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const CommentSchema = new Schema({
        nickName: {
            type: String,
            required: false,
            max: 20,
        },
        email: {
            type: String,
            required: true,
            match: /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/,
        },
        avatar: {
            type: String,
            required: false,
        },
        articleId: {
            type: String,
        },
        articleTitle: {
            type: String,
            min: 2,
            max: 200,
        },
        targetReplayId: {
            type: String,
            required: false,
            default: '',
        },
        targetReplayContent: {
            type: String,
            required: false,
            max: 200,
            default: '',
        },
        currentReplayContent: {
            type: String,
            required: false,
            max: 200,
            default: '',
        },
        commentTime: {
            type: Number,
            default: 0,
        },
        auditTime: {
            type: Number,
            default: 0,
        },
        auditStatus: {
            type: String,
            default: '3', // 0=全部 1=通过 2=驳回 3=未审核
        }
    }, {
        collection: 'comment',
        versionKey: false,
    });

    return mongoose.model('comment', CommentSchema);
};

