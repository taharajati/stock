const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogTagSchema = new Schema({
  name_en: { type: String, required: true },
  name_fa: { type: String, required: true }
});

module.exports = mongoose.model('BlogTag', BlogTagSchema); 