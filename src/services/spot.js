require('dotenv').config();
const axios = require('axios');
const { getKeywordsAndRecommendCategory } = require('./keyword');

// 카카오맵 API 키 설정
const kakaoApiKey = process.env.KAKAO_API_KEY;

// 카카오맵 API를 사용한 키워드 검색 함수
async function searchPlacesByKeyword(
  category,
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
          query: category,
          size: size, // 가져올 결과의 개수
          y: y_pos, // 중심 위치의 y좌표
          x: x_pos, // 중심 위치의 x좌표
          radius: 10000, // 반경 거리 단위: m, 최소:0, 최대: 20000
          page: page,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Kakao Maps API:', error);
    return [];
  }
}

const getAllSpots = async (username, x_pos, y_pos, page, size) => {
  const category = await getKeywordsAndRecommendCategory(username);
  return await searchPlacesByKeyword(category, x_pos, y_pos, page, size);
};

module.exports = {
  getAllSpots,
};
