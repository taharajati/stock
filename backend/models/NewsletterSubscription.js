const mongoose = require('mongoose');
const { Schema } = mongoose;

const NewsletterSubscriptionSchema = new Schema({
  email: { type: String, required: true, unique: true },
  subscribed_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NewsletterSubscription', NewsletterSubscriptionSchema); 