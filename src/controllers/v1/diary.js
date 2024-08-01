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

router.get('/count/:userId', async (req, res) => {
  await DiaryService.getDiaryCount(req, res);
  return res;
});

/**
 * 오늘 작성한 다이어리가 있는지 확인
 * userId: 사용자 아이디
 * date: 오늘 날짜
 * @return {boolean} true: 작성한 다이어리가 있음, false: 작성한 다이어리가 없음
 */
router.get('/checktoday/:userId', async (req, res) => {
  await DiaryService.checkTodayDiary(req, res);
  return res;
});

module.exports = router;
