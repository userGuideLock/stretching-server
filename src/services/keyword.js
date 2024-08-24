const { Diary, Keyword } = require('../models');
const { generateRecommendations } = require('./openaiService');
const categories = require('../constant/categories');

const getRecommendationsForUser = async (user) => {
  try {
    if (!user) {
      throw new Error('User not found');
    }

    // 추가 정보가 배열인지 확인하고 초기화
    const additionalInfo = Array.isArray(user.hobby)
      ? user.hobby
      : ['운동', '명상', '음악 감상', '여행'];

    // 다이어리 로그 가져오기: 다이어리 로그가 5개 이상이면 5개만 가져옴
    const diaryLogs = await Diary.findAll({
      where: { userId: user.id },
      order: [['date', 'DESC']],
      limit: 5,
    });

    if (!diaryLogs || diaryLogs.length === 0) {
      throw new Error('No diary logs found for user');
    }

    let keywordsText = diaryLogs.map((log) => log.content).join(' ');

    // 추가 정보가 있으면 텍스트로 결합
    if (additionalInfo.length > 0) {
      keywordsText += ` ${additionalInfo.join(' ')}`;
    }

    // 키워드 추출 및 추천 카테고리, 웰니스 프로그램, 힐링 컨텐츠 추천
    const jsonText = await generateRecommendations(keywordsText, categories);

    // json에서 키워드만 추출
    /**
     * 
    {
      "keywords": ["키워드1", "키워드2", "키워드3"],
      "recommendedCategory": "카테고리명",
      "recommendedWellnessProgram": "프로그램명 (한 단어)",
      "recommendedHealingContent": "컨텐츠명 (구체적인 구문)"
    }
    */
    //jsonText의 키워드만 추출
    const keywords = jsonText.keywords;
    console.log(keywords);

    //이미 해당 유저의 키워드가 같은 날짜에 존재하는지 확인
    const existingKeyword = await Keyword.findOne({
      where: {
        userId: user.id,
        date: new Date(),
      },
    });

    //이미 해당 유저의 키워드가 같은 날짜에 존재하면 업데이트
    if (existingKeyword) {
      await existingKeyword.update({
        keyword: keywords.join(','),
      });
      return jsonText;
    } else {
      //해당 keywords를 한꺼번에 저장
      await Keyword.create({
        userId: user.id,
        keyword: keywords.join(','),
      });
    }
    return jsonText;
  } catch (error) {
    console.error('Error in getRecommendationsForUser:', error);
    return null;
  }
};

module.exports = {
  getRecommendationsForUser,
};
