// models/Study.js
import mongoose from "mongoose";

const StudySchema = new mongoose.Schema({
  studyName: {
    type: String,
    required: true,
    minlength: 3
  },
  trialRegistryID: {
    type: String,
    default: null
  },
  abbreviation: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 6
  },
  country: {
    type: String,
    required: true
  },
  template: {
    type: String,
    enum: [
      'Randomized trial',
      'Observational study',
      'Registry / Biobank',
      'Survey study',
      'All forms',
      'No template'
    ],
    required: true
  },
  studyType: {
    type: String,
    enum: ['Production', 'Test', 'Example'],
    required: true
  },

  // ✅ Optional array of related sites
  sites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site'
  }],

  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Study = mongoose.model('Study', StudySchema);
export default Study;
