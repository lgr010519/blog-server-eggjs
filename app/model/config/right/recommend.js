module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const RightRecommendSchema = new Schema({
    project: {
      type: String,
    },
    showPosition: {
      type: [String],
      min: 1,
      max: 10,
    },
    name: {
      type: String,
      min: 1,
      max: 50,
    },
    cover: {
      type: String,
    },
    link: {
      type: String,
    },
    platform: {
      type: String,
      min: 1,
      max: 20,
    },
    isVip: {
      type: Boolean,
      default: false,
    },
    createTime: {
      type: Number,
      default: 0,
    },
    updateTime: {
      type: Number,
      default: 0,
    },
  }, {
    collection: 'right_recommend',
    versionKey: false,
  });

  return mongoose.model('rightRecommend', RightRecommendSchema);
};

