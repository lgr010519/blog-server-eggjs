module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    uid: {
      type: String,
      required: false,
    },
    provider: {
      type: String,
      required: false,
      default: 'local',
    },
    email: {
      type: String,
      required: true,
      match: /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/,
    },
    password: {
      type: String,
      required: true,
    },
    nickName: {
      type: String,
      required: false,
      max: 20,
    },
    avatar: {
      type: String,
      required: false,
    },
    introduction: {
      type: String,
      required: false,
      max: 1000,
    },
    articleIds: {
      type: 'array',
      default: 0,
    },
  }, {
    collection: 'user',
    versionKey: false,
  });

  return mongoose.model('user', UserSchema);
};