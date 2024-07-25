//클라이언트로부터 받은 데이터를 바탕으로 다이어리 일기장 생성
//시퀄라이즈를 사용하여 생성된 데이터를 데이터베이스에 저장
const db = require('../models');
const createDiary = async (req, res) => {
  const { date, mood, effort, content } = req.body;
  // try {
  const diary = await db.Diary.create({ date, mood, effort, content });
  res.status(200).json(diary);
  // } catch (error) {
  //   res.status(500).json({ message: 'Error creating diary', error });
  // }
};

//해당 유저의 모든 다이어리 일기장을 가져오기
//시퀄라이즈를 사용하여 데이터베이스에서 모든 다이어리 일기장을 가져오기
const getAllDiaries = async (req, res) => {
  const { userId } = req.params;
  try {
    const diaries = await db.Diary.findAll({
      attributes: ['id', 'date', 'mood', 'effort', 'content'],
      where: { userId },
    });
    res.status(200).json(diaries);
  } catch (error) {
    res.status(500).json({ message: 'Error getting diaries', error });
  }
};

module.exports = { createDiary, getAllDiaries };
