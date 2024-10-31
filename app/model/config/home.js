module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const HomeSchema = new Schema({
    introduction: {
      type: String,
      min: 2,
      max: 100,
    },
    effects: {
      type: Boolean,
      default: false,
    },
    archiveBgImg: {
      type: String,
    },
    categoriesBgImg: {
      type: String,
    },
    categoriesDetailBgImg: {
      type: String,
    },
    tagsBgImg: {
      type: String,
    },
    tagsDetailBgImg: {
      type: String,
    },
    aboutBgImg: {
      type: String,
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
    collection: 'home',
    versionKey: false,
  });

  return mongoose.model('home', HomeSchema);
};

