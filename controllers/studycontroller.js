import Study from '../models/study.schema.js';
import User from '../models/authentication.schema.js';

export const createStudy = async (req, res) => {
  try {
    const {
      studyName,
      trialRegistryID,
      abbreviation,
      country,
      template,
      studyType,
    } = req.body;

    // ✅ Validate all required fields
    if (
      !studyName ||
      !trialRegistryID ||
      !abbreviation ||
      !country ||
      !template ||
      !studyType
    ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // ✅ Check for duplicate studyName
    const existingStudy = await Study.findOne({ studyName });
    if (existingStudy) {
      return res.status(400).json({
        message: 'Study with this studyName already exists.',
      });
    }

    // ✅ Create new study
    const newStudy = new Study({
      studyName,
      trialRegistryID,
      abbreviation,
      country,
      template,
      studyType,
    });

    const savedStudy = await newStudy.save();
    // ✅ Add study ID to the logged-in user's `studies` array
    // Requires that `auth` middleware sets `req.user`
    if (req.user.id) {
      await User.findByIdAndUpdate(
        req.user.id,
        { $push: { studies: savedStudy._id } },
        { new: true }
      );
    }

    return res.status(201).json(savedStudy);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error while creating study.' });
  }
};


export const getStudies = async (req, res) => {
  try {
    // ✅ Ensure user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // ✅ Fetch studies for the authenticated user
    const user = await User.findById(req.user.id).populate('studies');
    return res.status(200).json(user.studies);
  } catch (error) {
    return res.status(500).json({ message: 'Server error while fetching studies.' });
  }
}