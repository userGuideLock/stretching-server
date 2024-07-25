const db = require('../models');
const { extractKeywords, recommendCategory } = require('./openaiService');
const categories = require('../constant/categories');

const getKeywordsAndRecommendCategory = async (username) => {
  try {
    // 유저 정보 가져오기
    const user = await db.User.findOne({ where: { username } });

    if (!user) {
      throw new Error('User not found');
    }

    // const user = {
    //   stressReliefKeywords: ['운동', '명상', '음악 감상', '여행'],
    // };

    // 추가 정보가 배열인지 확인하고 초기화
    const additionalInfo = Array.isArray(user.stressReliefKeywords)
      ? user.stressReliefKeywords
      : ['운동', '명상', '음악 감상', '여행'];

    // 다이어리 로그 가져오기: 다이어리 로그가 5개 이상이면 5개만 가져옴
    const diaryLogs = await db.Diary.findAll({
      where: { username: username },
      order: [['date', 'DESC']],
      limit: 5,
    });

    // const diaryLogs = [
    //   {
    //     content:
    //       '오늘 하루는 너무 힘들었다. 김부장이 나를 못살게 굴었기 때문이다. 나는 오늘 길을 걸으면서 커피' +
    //       '한 잔을 마셨다. 커피를 마셨더니 기분이 좋아졌다.',
    //   },
    // ];

    if (!diaryLogs || diaryLogs.length === 0) {
      throw new Error('No diary logs found for user');
    }

    let keywordsText = diaryLogs.map((log) => log.content).join(' ');

    // 추가 정보가 있으면 텍스트로 결합
    if (additionalInfo.length > 0) {
      keywordsText += ` ${additionalInfo.join(' ')}`;
    }

    // 키워드 추출
    const keywords = await extractKeywords(keywordsText);

    // GPT를 사용하여 최적의 카테고리 추천
    return await recommendCategory(keywords, categories);
  } catch (error) {
    console.error('Error in getKeywordsAndRecommendCategory:', error);
    return null;
  }
};

module.exports = {
  getKeywordsAndRecommendCategory,
};
