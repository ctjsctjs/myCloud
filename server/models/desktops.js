const mongoose = require('mongoose');

const tasksSchema = mongoose.Schema({
  name: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model('Desktop', tasksSchema);
