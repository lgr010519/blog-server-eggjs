module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const HeaderSchema = new Schema({
    logo: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
      max: 20,
    },
    openSearch: {
      type: Boolean,
      default: true,
    },
    login: {
      type: Boolean,
      default: false,
    },
    register: {
      type: Boolean,
      default: false,
    },
  })

  const FooterSchema = new Schema({
    copyright: {
      type: String,
      min: 1,
      max: 200,
    },
    extra: {
      type: String,
      min: 1,
      max: 200,
    },
  })

  const HfSchema = new Schema({
    header: {
      type: HeaderSchema,
    },
    footer: {
      type: FooterSchema,
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
    collection: 'hf',
    versionKey: false,
  });

  return mongoose.model('hf', HfSchema);
};

