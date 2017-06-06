const mongoose =require('mongoose');

module.exports = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost:auth/auth');
}
