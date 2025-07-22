// models/Site.js
import mongoose from "mongoose";

const SiteSchema = new mongoose.Schema({
  siteName: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },

  location: {
    type: String
  },

  contactEmail: {
    type: String
  },

  // ✅ Single study only
  study: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Study',
    required: true
  },

  subjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  }],

  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Site = mongoose.model('Site', SiteSchema);
export default Site;
