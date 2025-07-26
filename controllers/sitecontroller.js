import Site from '../models/site.schema.js';
import Study from '../models/study.schema.js';


export const createSite = async (req, res) => {
  try {
    const { siteName, location, contactEmail, studyId } = req.body; // ⬅️ include `study`
    // Validate required fields
    if (!siteName || !studyId) {
      return res.status(400).json({ error: 'Site name and study ID are required.' });
    }

    // Check if the referenced study exists
    const existingStudy = await Study.findById(studyId);
    if (!existingStudy) {
      return res.status(404).json({ error: 'Study not found.' });
    }

    // Create and save the new site
    const newSite = new Site({
      siteName,
      location,
      contactEmail,
      study: studyId // ⬅️ assign the study ID
    });

    await newSite.save();

    // Optionally push the site to study.sites array (if you're maintaining a reverse relationship)
    if (Array.isArray(existingStudy.sites)) {
      existingStudy.sites.push(newSite._id);
      await existingStudy.save();
    }

    return res.status(201).json({
      message: 'Site created successfully.',
      site: newSite
    });

  } catch (error) {
    e.error('Error creating site:', error);
    return res.status(500).json({
      error: 'Internal server error while creating site.',
      details: error.message
    });
  }
};

export const getSitesByStudyId = async (req, res) => {
  const { studyid } = req.params;
  try {
    const study = await Study.findById(studyid).populate('sites'); // ✅ Must populate correctly
    if (!study) {
      return res.status(404).json({ error: 'Study not found.' });
    }

    return res.status(200).json(study.sites); // ✅ Return only the sites array
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
