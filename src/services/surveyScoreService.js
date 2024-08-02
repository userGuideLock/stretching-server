const db = require('../models');

// 클라이언트로부터 surveyScore를 받아와서 설문 점수를 저장
const saveSurveyScore = async (req, res) => {
  const { userId, score } = req.body;
  // 필수 데이터가 없는 경우 에러 메시지 반환
  if (!userId || !score) {
    return res.status(400).json({ code: 1, message: 'Invalid input' });
  }

  //유저 조회
  const user = await db.User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(400).json({ code: 2, message: 'User not found' });
  }

  // 이미 설문 점수가 있다면 업데이트 하기
  const surveyScore = await db.SurveyScore.findOne({ where: { userId } });
  if (surveyScore) {
    try {
      await db.SurveyScore.update({ score }, { where: { userId } });
      return res.status(200).json({ message: 'Survey score updated' });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error updating survey score', error });
    }
  }

  // 설문 점수가 없다면 새로 생성
  try {
    await db.SurveyScore.create({
      userId,
      score,
    });
    res.status(200).json({ message: 'Survey score saved' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving survey score', error });
  }
};

// 해당 유저의 설문 점수를 가져오기
// 시퀄라이즈를 사용하여 데이터베이스에서 설문 점수를 가져오기
// 설문 점수가 있다면 반환, 없다면 메시지 반환
const getSurveyScore = async (req, res) => {
  const { userId } = req.params;

  //유저 조회
  const user = await db.User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  try {
    const surveyScore = await db.SurveyScore.findOne({
      attributes: ['score'],
      where: { userId },
    });
    // 설문 점수가 없다면 메시지 반환
    if (!surveyScore) {
      return res.status(200).json({ message: 'Survey score not found' });
    }
    // 설문 점수가 있다면 반환
    res.status(200).json({ score: +surveyScore.score });
  } catch (error) {
    res.status(500).json({ message: 'Error getting survey score', error });
  }
};

module.exports = {
  saveSurveyScore,
  getSurveyScore,
};
