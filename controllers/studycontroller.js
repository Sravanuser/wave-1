import Study from '../models/study.schema.js';
import Site from '../models/site.schema.js'
import mongoose from 'mongoose';

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

    if (!studyName || !trialRegistryID || !abbreviation || !country || !template || !studyType) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingStudy = await Study.findOne({ studyName });
    if (existingStudy) {
      return res.status(400).json({ message: 'Study with this studyName already exists.' });
    }

    const newStudy = new Study({
      studyName,
      trialRegistryID,
      abbreviation,
      country,
      template,
      studyType
    });

    const savedStudy = await newStudy.save();
    return res.status(201).json(savedStudy);
  } catch (error) {
    console.error('Error creating study:', error);
    return res.status(500).json({ message: 'Server error while creating study.' });
  }
};


export const getAllStudies = async (req, res) => {
  try {
    const studies = await Study.find().sort({ createdAt: -1 }); // newest first
    return res.status(200).json(studies);
  } catch (error) {
    console.error('Error fetching studies:', error);
    return res.status(500).json({ message: 'Server error while fetching studies.' });
  }
};
