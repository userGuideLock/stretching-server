const express = require('express');
const { DiaryService } = require('../../services');
const router = express.Router();

router.post('/', async (req, res) => {
  await DiaryService.createDiary(req, res);
  return res;
});

router.get('/:userId', async (req, res) => {
  await DiaryService.getAllDiaries(req, res);
  return res;
});

module.exports = router;
