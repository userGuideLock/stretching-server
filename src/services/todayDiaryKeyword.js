const db = require('../models');

// 클라이언트로부터 userId와 date를 받고 해당 날짜의 다이어리와 키워드를 반환
const getTodayDiaryKeyword = async (req, res) => {
  const userId = req.params.userId;
  const date = req.query.date;

  if (!userId || !date) {
    return res.status(400).json({ code: 1, message: 'Invalid input' });
  }

  //유저 조회
  const user = await db.User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(400).json({ code: 2, message: 'User not found' });
  }

  //해당 날짜 다이어리 조회
  const diary = await db.Diary.findOne({ where: { userId, date } });

  //해당 날짜 키워드 조회
  const keyword = await db.Keyword.findOne({ where: { userId, date } });

  return res.status(200).json({ diary, keyword });
};

module.exports = {
  getTodayDiaryKeyword,
};
