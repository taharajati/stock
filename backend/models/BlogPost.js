const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
  user: {
    username: String,
    name: String,
    avatar: String
  },
  content: String,
  created_at: { type: Date, default: Date.now }
});

const VideoSchema = new Schema({
  url: String,           // Video URL
  type: String,          // e.g., 'intro', 'tutorial', 'interview', etc.
  thumbnail: String,     // Thumbnail image URL
  duration: Number       // Duration in seconds
}, { _id: false });

const AuthorSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  avatar: String,
  bio: String
}, { _id: false });

const BlogPostSchema = new Schema({
  title: { type: String, required: true },
  author: { type: AuthorSchema, required: true },
  published_date: { type: Date, required: true },
  published_date_jalali: { type: String, required: true },
  updated_at: { type: Date },
  content: { type: String, required: true },
  tags: [{ type: String }],
  title_image: { type: String },
  has_title_image: { type: Boolean, default: false },
  video: { type: VideoSchema },
  has_video: { type: Boolean, default: false },
  show: { type: Boolean, default: true },
  summary: { type: String },
  like_count: { type: Number, default: 0 },
  replies_count: { type: Number, default: 0 },
  view_count: { type: Number, default: 0 },
  comments: [CommentSchema]
});

module.exports = mongoose.model('BlogPost', BlogPostSchema); 