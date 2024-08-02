const express = require('express');
const { SurveyScoreService } = require('../../services');
const router = express.Router();

// 설문 점수 저장. 있으면 업데이트, 없으면 새로 생성
router.post('/', async (req, res) => {
  await SurveyScoreService.saveSurveyScore(req, res);
  return res;
});

// 설문 점수 가져오기. 있으면 점수 반환, 없으면 메시지 반환
router.get('/:userId', async (req, res) => {
  await SurveyScoreService.getSurveyScore(req, res);
  return res;
});

module.exports = router;
