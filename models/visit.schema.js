import mongoose from 'mongoose';

const screeningSchema = new mongoose.Schema({
  visitPerformed: {
    type: String,
    enum: ['Yes', 'Other'],
    required: true
  },
  ageValid: {
    type: String,
    enum: ['Yes', 'No'],
    required: true
  },
  diagnosis: {
    type: String,
    enum: ['Yes', 'No'],
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  ethnicity: {
    type: String,
    enum: ['Asian', 'Black', 'White', 'Other'],
    required: true
  }
}, {
  timestamps: true
});

const medicalSchema = new mongoose.Schema({
  priorSurgery: {
    type: String,
    enum: ['Yes', 'No'],
    required: true
  },
  pregnancyTest: {
    type: String,
    enum: ['Yes', 'No'],
    required: true
  }
}, {
  timestamps: true
});

// Main schema that includes both Screening and Medical
const subjectSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
  },
  screening: screeningSchema,  // Embedded Screening schema
  medical: medicalSchema,      // Embedded Medical schema
}, {
  timestamps: true
});

// Create a Mongoose model for the combined schema
const Visit = mongoose.model('Visit', subjectSchema);
export default Visit;
