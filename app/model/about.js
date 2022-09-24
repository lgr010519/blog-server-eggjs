module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const AboutSchema = new Schema({
        imgs: [
            {
                imgUrl: {type: String},
                link: {type: String, required: false}
            }
        ],
        desc: {
            type: String,
            min: 1,
            max: 800,
        },
        tags: [String],
        createTime: {
            type: Number,
            default: 0,
        },
        updateTime: {
            type: Number,
            default: 0,
        },
        showResume: {
            type: Boolean,
            default: false,
        },
    }, {
        collection: 'about',
        versionKey: false,
    });

    return mongoose.model('about', AboutSchema);
};

