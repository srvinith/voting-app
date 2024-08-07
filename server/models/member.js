const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: String,
  votes: Number,
});

module.exports = mongoose.model('Member', MemberSchema);
