const express = require('express');
const { TodayDiaryKeywordService } = require('../../services');
const router = express.Router();

// 오늘 작성한 다이어리와 얻은 키워드 가져오기
router.get('/:userId', async (req, res) => {
  await TodayDiaryKeywordService.getTodayDiaryKeyword(req, res);
  return res;
});

module.exports = router;
