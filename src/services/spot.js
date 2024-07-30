require('dotenv').config();
const axios = require('axios');
const { getRecommendationsForUser } = require('./keyword');

// 카카오맵 API 키 설정
const kakaoApiKey = process.env.KAKAO_API_KEY;

// 카카오맵 API를 사용한 키워드 검색 함수
async function searchPlacesByKeyword(
  keyword,
  x_pos,
  y_pos,
  page = 1,
  size = 5,
) {
  try {
    const response = await axios.get(
      'https://dapi.kakao.com/v2/local/search/keyword.json',
      {
        headers: {
          Authorization: `KakaoAK ${kakaoApiKey}`,
        },
        params: {
          query: keyword,
          size: size, // 가져올 결과의 개수
          y: y_pos, // 중심 위치의 y좌표
          x: x_pos, // 중심 위치의 x좌표
          radius: 10000, // 반경 거리 단위: m, 최소:0, 최대: 20000
          page: page,
        },
      },
    );
    return response.data.documents; // 검색 결과에서 장소 정보만 추출
  } catch (error) {
    console.error('Error fetching data from Kakao Maps API:', error);
    return [];
  }
}

const getAllSpots = async (username, x_pos, y_pos, page = 1, size = 5) => {
  try {
    const recommendations = await getRecommendationsForUser(username);

    if (!recommendations) {
      throw new Error('No recommendations found');
    }

    const {
      recommendedCategory,
      recommendedWellnessProgram,
      recommendedHealingContent,
    } = recommendations;

    // 각 추천 항목에 대해 장소 검색 수행
    const categoryPlaces = await searchPlacesByKeyword(
      recommendedCategory,
      x_pos,
      y_pos,
      page,
      size,
    );
    const wellnessProgramPlaces = await searchPlacesByKeyword(
      recommendedWellnessProgram,
      x_pos,
      y_pos,
      page,
      size,
    );

    // 힐링 컨텐츠는 텍스트 그대로 제공
    const healingContentText = recommendedHealingContent;

    // 모든 검색 결과 및 힐링 컨텐츠 텍스트 반환
    return {
      categoryPlaces,
      wellnessProgramPlaces,
      healingContentText,
    };
  } catch (error) {
    console.error('Error in getAllSpots:', error);
    return {
      categoryPlaces: [],
      wellnessProgramPlaces: [],
      healingContentText: '',
    };
  }
};

module.exports = {
  getAllSpots,
};
