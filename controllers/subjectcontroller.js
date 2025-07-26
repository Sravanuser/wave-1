import Subject from '../models/subject.schema.js';
import Site from '../models/site.schema.js';


export const createSubject = async (req, res) => {
  try {
    const { name, email, site } = req.body;

    // ✅ Basic validation
    if (!name || !email || !site) {
      return res.status(400).json({ error: 'Name, email, and site are required.' });
    }

    // ✅ Check if email already exists
    const existingSubject = await Subject.findOne({ email });
    if (existingSubject) {
      return res.status(409).json({ error: 'A subject with this email already exists.' });
    }

    // ✅ Verify that the provided site exists
    const existingSite = await Site.findById(site);
    if (!existingSite) {
      return res.status(404).json({ error: 'Site not found.' });
    }

    // ✅ Create new subject
    const newSubject = new Subject({ name, email, site });
    await newSubject.save();

    // ✅ Optional: Add subject to site's subjects array (if you're tracking it)
    if (Array.isArray(existingSite.subjects)) {
      existingSite.subjects.push(newSubject._id);
      await existingSite.save();
    }

    return res.status(201).json({
      message: 'Subject created successfully.',
      subject: newSubject
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error while creating subject.',
      details: error.message
    });
  }
};

export const getAllSubjects = async (req, res) => {
  const { siteId } = req.params;
  try {
    // ✅ Optional: Validate if site exists
    const siteExists = await Site.findById(siteId).populate('subjects');
    if (!siteExists) {
      return res.status(404).json({ error: 'Site not found' });
    }
    if (!siteExists.subjects || siteExists.subjects.length === 0) {
      return res.status(404).json({ error: 'No subjects found for this site.' });
    }
    return res.status(200).json(siteExists.subjects);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
