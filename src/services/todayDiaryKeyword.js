const db = require('../models');

// 클라이언트로부터 userId와 date를 받고 해당 날짜의 다이어리와 키워드를 반환
const getTodayDiaryKeyword = async (req, res) => {
  const userId = req.params.userId;
  const lowestDate = req.query.lowestdate;
  const highestDate = req.query.highestdate;
  const lowestSlopeDate = req.query.lowestdate;

  if (!userId || !lowestDate || !highestDate || !lowestDate) {
    return res.status(400).json({ code: 1, message: 'Invalid input' });
  }

  //유저 조회
  const user = await db.User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(400).json({ code: 2, message: 'User not found' });
  }

  //해당 날짜 다이어리 조회
  const lowestDateDiary = await db.Diary.findOne({
    where: { userId, date: lowestDate },
  });

  //해당 날짜 키워드 조회
  const lowestDateKeyword = await db.Keyword.findOne({
    where: { userId, date: lowestDate },
  });

  //해당 날짜 다이어리 조회
  const highestDateDiary = await db.Diary.findOne({
    where: { userId, date: highestDate },
  });

  //해당 날짜 키워드 조회
  const highestDateKeyword = await db.Keyword.findOne({
    where: { userId, date: highestDate },
  });

  //해당 날짜 다이어리 조회
  const lowestSlopeDateDiary = await db.Diary.findOne({
    where: { userId, date: lowestSlopeDate },
  });

  //해당 날짜 키워드 조회
  const lowestSlopeDateKeyword = await db.Keyword.findOne({
    where: { userId, date: lowestSlopeDate },
  });

  return res.status(200).json({
    lowestDateDiary,
    lowestDateKeyword,
    highestDateDiary,
    highestDateKeyword,
    lowestSlopeDateDiary,
    lowestSlopeDateKeyword,
  });
};

module.exports = {
  getTodayDiaryKeyword,
};
