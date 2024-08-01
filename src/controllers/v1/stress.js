const express = require('express');
const { StressService } = require('../../services');
const router = express.Router();

router.post('/record', async (req, res) => {
  await StressService.saveStressScore(req, res);
  return res;
});

router.get('/record/:userId', async (req, res) => {
  await StressService.getAllStressScores(req, res);
  return res;
});

router.get('/record/checktoday/:userId', async (req, res) => {
  await StressService.checkStressScoreWritten(req, res);
  return res;
});

module.exports = router;
