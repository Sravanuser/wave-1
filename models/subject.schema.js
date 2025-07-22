// models/Subject.js
import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true
  },

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  visit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Visit',
  },

  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site',
    required: true
  }
}, {
  timestamps: true
});

// Auto-increment logic

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;
