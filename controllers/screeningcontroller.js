import mongoose from 'mongoose';
import Visit from '../models/visit.schema.js';
import Subject from '../models/subject.schema.js';

export const createVisit = async (req, res) => {
  const {
    subjectId,
    visitPerformed,
    ageValid,
    diagnosis,
    gender,
    ethnicity,
    priorSurgery,
    pregnancyTest,
  } = req.body;

  // The unit of work we want to run (with or without a session)
  const work = async (session) => {
    const visitDoc = new Visit({
      screening: {
        visitPerformed,
        ageValid,
        diagnosis,
        gender,
        ethnicity,
      },
      medical: {
        priorSurgery,
        pregnancyTest,
      },
    });

    const savedVisit = await visitDoc.save(session ? { session } : undefined);

    const updatedSubject = await Subject.findByIdAndUpdate(
      subjectId,
      { visit: savedVisit._id },
      {
        new: true,
        ...(session && { session }),
      }
    );

    if (!updatedSubject) {
      // roll up a clean error so both paths handle it the same way
      const err = new Error('Subject not found');
      err.status = 404;
      throw err;
    }

    return { visit: savedVisit, subject: updatedSubject };
  };

  let session;
  try {
    // --- Try transactional path ---
    session = await mongoose.startSession();
    try {
      session.startTransaction();

      const data = await work(session);

      await session.commitTransaction();
      return res.status(201).json({
        message:
          'Visit with Screening and Medical data saved and added to Subject successfully (transactional)',
        data,
      });
    } catch (err) {
      // Abort if we actually managed to start a transaction
      if (session.inTransaction()) {
        await session.abortTransaction();
      }

      // If transactions aren’t supported, fall back to non-transactional flow
      const notSupported =
        err?.code === 20 ||
        err?.codeName === 'IllegalOperation' ||
        /Transaction numbers are only allowed on a replica set member or mongos/i.test(
          err?.message || ''
        );

      if (notSupported) {
        try {
          const data = await work(null);
          return res.status(201).json({
            message:
              'Visit with Screening and Medical data saved and added to Subject successfully (non-transactional)',
            data,
          });
        } catch (innerErr) {
          const status = innerErr.status || 500;
          return res.status(status).json({
            message: 'Error saving visit and updating subject',
            error: innerErr.message,
          });
        }
      }

      // If it's some other error, bubble it up
      throw err;
    }
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({
      message: 'Error saving visit and updating subject',
      error: err.message,
    });
  } finally {
    if (session) session.endSession();
  }
};
