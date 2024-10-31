module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const FriendLinkSchema = new Schema({
    link: {
      type: String,
    },
    icon: {
      type: String,
    },
  })

  const RightIntroductionSchema = new Schema({
    nickName: {
      type: String,
      min: 2,
      max: 20,
    },
    desc: {
      type: String,
      min: 2,
      max: 100,
    },
    tags: {
      type: [String],
      min: 1,
      max: 10,
    },
    friendLink: {
      type: [FriendLinkSchema],
      min: 1,
      max: 4,
    },
    showPosition: {
      type: [String],
      min: 1,
      max: 10,
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
    collection: 'right_introduction',
    versionKey: false,
  });

  return mongoose.model('rightIntroduction', RightIntroductionSchema);
};

