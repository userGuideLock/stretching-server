const db = require('../models');

// 클라이언트로부터 받은 데이터를 바탕으로 다이어리 일기장 생성
// 시퀄라이즈를 사용하여 생성된 데이터를 데이터베이스에 저장
const createDiary = async (req, res) => {
  const { userId, date, mood, effort, content } = req.body;
  // 필수 데이터가 없는 경우 에러 메시지 반환
  if (!userId || !date || !mood || !effort || !content) {
    return res.status(400).json({ code: 1, message: 'Invalid input' });
  }

  //유저 조회
  const user = await db.User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(400).json({ code: 2, message: 'User not found' });
  }

  try {
    // 이미 해당 날짜에 작성된 다이어리가 있는지 확인
    const diaryExist = await db.Diary.findOne({ where: { userId, date } });
    if (diaryExist) {
      return res.status(400).json({ code: 3, message: 'Diary already exists' });
    }

    await db.Diary.create({
      userId,
      date,
      mood,
      effort,
      content,
    });
    res.status(200).json({ message: 'Diary created' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating diary', error });
  }
};

// 해당 유저의 모든 다이어리 일기장을 가져오기
// 시퀄라이즈를 사용하여 데이터베이스에서 모든 다이어리 일기장을 가져오기
const getAllDiaries = async (req, res) => {
  const { userId } = req.params;

  //유저 조회
  const user = await db.User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

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

// 유저가 회원가입된 날짜로부터 오늘까지 작성한 다이어리 개수와 작성하지 않은 다이어리 개수를 계산하여 반환
const getDiaryCount = async (req, res) => {
  const { userId } = req.params;
  if (req.query.today == null) {
    return res.status(400).json({ code: 1, message: 'Invalid input' });
  }
  const today = req.query.today ? new Date(req.query.today) : new Date();

  // 유저 정보 가져오기
  const user = await db.User.findOne({ where: { id: userId } });

  // 유저가 존재하지 않는 경우 에러 메시지 반환
  if (!user) {
    return res.status(400).json({ code: 2, message: 'User not found' });
  }

  // 유저가 회원가입한 날짜 createdAt 가져오기
  const userCreatedAt = user.createdTime;

  // 유저가 회원가입한 날짜부터 오늘까지의 일수를 계산
  const untilToday =
    Math.floor((today - userCreatedAt) / (1000 * 60 * 60 * 24)) + 1;

  // 오늘까지 작성한 다이어리 개수 가져오기
  const diaries = await db.Diary.findAll({
    where: { userId },
  });

  // 오늘까지 작성하지 않은 다이어리 개수 계산
  const notWrittenDiaryCount = untilToday - diaries.length;

  res
    .status(200)
    .json({ writtenDiaryCount: diaries.length, notWrittenDiaryCount });
};

// 해당유저가 오늘 일기를 작성했는지 확인
const checkTodayDiary = async (req, res) => {
  const { userId } = req.params;
  if (req.query.today == null) {
    return res.status(400).json({ code: 1, message: 'Invalid input' });
  }
  const today = req.query.today ? new Date(req.query.today) : new Date();

  // 유저 정보 가져오기
  const user = await db.User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(400).json({ code: 2, message: 'User not found' });
  }

  // 오늘 작성한 다이어리가 있는지 확인. 있으면 true, 없으면 false 반환
  const diary = await db.Diary.findOne({
    where: { userId, date: today },
  });
  if (diary) {
    res.status(200).json({ today_diary: true });
  } else {
    res.status(200).json({ today_diary: false });
  }
};

module.exports = { createDiary, getAllDiaries, getDiaryCount, checkTodayDiary };
