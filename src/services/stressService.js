const db = require('../models');

// 클라이언트로부터 date, stressScore를 받아와서 스트레스 점수를 저장
const saveStressScore = async (req, res) => {
  const { userId, date, score } = req.body;
  // 필수 데이터가 없는 경우 에러 메시지 반환
  if (!userId || !date || !score) {
    return res.status(400).json({ code: 1, message: 'Invalid input' });
  }

  // date 형식이 맞는지 확인
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ code: 2, message: 'Invalid date format' });
  }
  //유저 조회
  const user = await db.User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(400).json({ code: 3, message: 'User not found' });
  }

  try {
    // 이미 해당 날짜에 작성된 스트레스 점수가 있는지 확인
    const stressExist = await db.Stress.findOne({ where: { userId, date } });
    if (stressExist) {
      return res
        .status(400)
        .json({ code: 4, message: 'Stress score already exists' });
    }

    await db.Stress.create({
      userId,
      date,
      score,
    });
    res.status(200).json({ message: 'Stress score saved' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving stress score', error });
  }
};

// 해당 유저의 모든 스트레스 점수를 가져오기
// 시퀄라이즈를 사용하여 데이터베이스에서 모든 스트레스 점수를 가져오기
const getAllStressScores = async (req, res) => {
  const { userId } = req.params;

  //유저 조회
  const user = await db.User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  try {
    const stressScores = await db.Stress.findAll({
      attributes: ['id', 'date', 'score'],
      where: { userId },
    });

    res.status(200).json(stressScores);
  } catch (error) {
    res.status(500).json({ message: 'Error getting stress scores', error });
  }
};

// 해당 유저가 해당 날짜에 스트레스 점수를 기록하였는지 확인
// 시퀄라이즈를 사용하여 데이터베이스에서 해당 날짜에 스트레스 점수가 있는지 확인
// 있으면 true, 없으면 false 반환
const checkStressScoreWritten = async (req, res) => {
  const { userId } = req.params;
  const { date } = req.query;
  // date 형식이 맞는지 확인
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ code: 1, message: 'Invalid date format' });
  }

  //유저 조회
  const user = await db.User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(400).json({ code: 2, message: 'User not found' });
  }

  try {
    const stressScore = await db.Stress.findOne({
      where: { userId, date },
    });

    if (stressScore) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error checking stress score', error });
  }
};

module.exports = {
  saveStressScore,
  getAllStressScores,
  checkStressScoreWritten,
};
