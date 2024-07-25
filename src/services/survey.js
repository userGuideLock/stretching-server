const db = require('../models');

const createSurvey = async (surveyData) => {
  try {
    const survey = await db.Survey.create(surveyData);

    return survey;
  } catch (err) {
    console.error('Error creating survey:', err);
    throw err;
  }
};

const updateSurvey = async (id, updatedData) => {
  try {
    const [updated] = await db.Survey.update(updatedData, {
      where: { id },
    });
    if (updated) {
      const updatedSurvey = await db.Survey.findOne({ where: { id } });
      return updatedSurvey;
    }
    throw new Error('Survey not found');
  } catch (err) {
    console.error('Error updating survey:', err);
    throw err;
  }
};

module.exports = {
  createSurvey,
  updateSurvey,
};
