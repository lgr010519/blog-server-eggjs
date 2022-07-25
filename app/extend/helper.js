const moment = require('moment');
exports.relativeTime = (time) => moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss')