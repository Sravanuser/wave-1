import mongoose from 'mongoose';
import Visit from '../models/visit.schema.js';
import Subject from '../models/subject.schema.js';

// Controller to create a Visit and update the Subject document with the Visit ID
export const createVisit = async (req, res) => {
  const session = await mongoose.startSession();  // Start a session for transaction
  session.startTransaction();

  try {
    const { subjectId, visitPerformed, ageValid, diagnosis, gender, ethnicity, priorSurgery, pregnancyTest } = req.body;
    console.log('Creating visit with data:', req.body);
    // Step 1: Create the Visit document with Screening and Medical data
    const newVisit = new Visit({
      screening: {
        visitPerformed,
        ageValid,
        diagnosis,
        gender,
        ethnicity
      },
      medical: {
        priorSurgery,
        pregnancyTest
      }
    });

    // Save the Visit document within the transaction
    const savedVisit = await newVisit.save({ session });

    // Step 2: Find the Subject document and update the `visit` field with the new Visit ID
    const updatedSubject = await Subject.findByIdAndUpdate(
      subjectId,
      { visit: savedVisit._id },  // Update the 'visit' field with the saved Visit ID
      { new: true, session }  // Ensure the updated document is returned
    );

    if (!updatedSubject) {
      throw new Error('Subject not found');
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Respond with success
    res.status(201).json({
      message: 'Visit with Screening and Medical data saved and added to Subject successfully',
      data: { visit: savedVisit, subject: updatedSubject }
    });
  } catch (err) {
    // Rollback the transaction in case of an error
    await session.abortTransaction();
    session.endSession();

    console.error('Error saving visit and updating subject:', err);
    res.status(500).json({
      message: 'Error saving visit and updating subject',
      error: err.message
    });
  }
};
