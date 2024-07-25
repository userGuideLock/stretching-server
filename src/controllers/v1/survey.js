const express = require('express');
const router = express.Router();
const surveyService = require('../../services/survey');

// POST /api/v1/surveys
router.post('/', async (req, res) => {
  const {
    id,
    step1,
    step2,
    step3,
    step4,
    step5,
    step6,
    step7,
    step8,
    step9,
    step10,
    step11,
    step12,
    step13,
    step14,
    step15,
    step16,
    step17,
    step18,
    step19,
    step20,
    step21,
    step22,
  } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const surveyData = {
    id,
    step1,
    step2,
    step3,
    step4,
    step5,
    step6,
    step7,
    step8,
    step9,
    step10,
    step11,
    step12,
    step13,
    step14,
    step15,
    step16,
    step17,
    step18,
    step19,
    step20,
    step21,
    step22,
  };

  try {
    const survey = await surveyService.createSurvey(surveyData);

    res.status(201).json({ message: 'Survey successfully created', survey });
  } catch (err) {
    console.error('Error during survey creation:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /api/v1/surveys/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    step1,
    step2,
    step3,
    step4,
    step5,
    step6,
    step7,
    step8,
    step9,
    step10,
    step11,
    step12,
    step13,
    step14,
    step15,
    step16,
    step17,
    step18,
    step19,
    step20,
    step21,
    step22,
  } = req.body;

  const updatedData = {
    step1,
    step2,
    step3,
    step4,
    step5,
    step6,
    step7,
    step8,
    step9,
    step10,
    step11,
    step12,
    step13,
    step14,
    step15,
    step16,
    step17,
    step18,
    step19,
    step20,
    step21,
    step22,
  };

  try {
    const updatedSurvey = await surveyService.updateSurvey(id, updatedData);
    res
      .status(200)
      .json({ message: 'Survey successfully updated', updatedSurvey });
  } catch (err) {
    console.error('Error during survey update:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
