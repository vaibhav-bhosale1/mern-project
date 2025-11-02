// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: { type: String },
  facebookId: { type: String },
  githubId: { type: String },
  displayName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);