module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ImgsSchema = new Schema({
    imgUrl: {
      type: String,
    },
    link: {
      type: String,
    },
  })

  const RightAdSchema = new Schema({
    imgs: {
      type: [ImgsSchema],
      min: 1,
      max: 3,
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
    collection: 'right_ad',
    versionKey: false,
  });

  return mongoose.model('rightAd', RightAdSchema);
};

