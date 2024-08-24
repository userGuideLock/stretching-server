require('dotenv').config();
const axios = require('axios');
const { getRecommendationsForUser } = require('./keyword');
const { User } = require('../models');

const kakaoApiKey = process.env.KAKAO_API_KEY;

async function searchPlacesByKeyword(keyword, x_pos, y_pos, page, size) {
  try {
    const response = await axios.get(
      'https://dapi.kakao.com/v2/local/search/keyword.json',
      {
        headers: {
          Authorization: `KakaoAK ${kakaoApiKey}`,
        },
        params: {
          query: keyword,
          size: size,
          y: y_pos,
          x: x_pos,
          radius: 10000,
          page: page,
        },
      },
    );
    return response.data.documents;
  } catch (error) {
    console.error('Error fetching data from Kakao Maps API:', error);
    return [];
  }
}

const getAllSpots = async (username, x_pos, y_pos, page, size) => {
  try {
    const user = await User.findOne({ where: { id: username } });

    if (!user) {
      throw new Error('User not found');
    }

    const recommendations = await getRecommendationsForUser(user);

    if (!recommendations) {
      throw new Error('No recommendations found');
    }

    const { recommendedCategory } = recommendations;

    const categoryPlaces = await searchPlacesByKeyword(
      recommendedCategory,
      x_pos,
      y_pos,
      page,
      size,
    );

    const clusterTopCategories = {
      0: ['스파', '종교', '가족'],
      1: ['오락', '교육', '역사'],
      2: ['촬영', '오락', '동물원', '테마파크'],
      3: ['시티투어', '교육', '축제'],
    };

    const locationCoordinates = {
      '20대_남': [
        { x: 37.4489926, y: 126.9538519 },
        { x: 37.4832519, y: 126.9287583 },
        { x: 37.550912, y: 126.921127 },
        { x: 35.8708214, y: 128.5955436 },
        { x: 35.1554021, y: 129.0638741 },
      ],
      '20대_여': [
        { x: 37.4585522, y: 126.9472851 },
        { x: 37.4832519, y: 126.9287583 },
        { x: 37.5466701, y: 126.9244874 },
        { x: 35.8616593, y: 128.6069999 },
        { x: 35.1554021, y: 129.0638741 },
      ],
      '30대_남': [
        { x: 37.5318046, y: 126.9141547 },
        { x: 37.528786, y: 126.968395 },
        { x: 37.5067853, y: 127.0603993 },
        { x: 37.5664235, y: 126.9678039 },
        { x: 37.0891196, y: 126.9112393 },
      ],
      '30대_여': [
        { x: 37.5170751, y: 126.9033411 },
        { x: 37.5390298, y: 127.0020559 },
        { x: 37.5226393, y: 127.0362922 },
        { x: 37.5620577, y: 126.9805633 },
        { x: 37.1599476, y: 127.1109475 },
      ],
      // Other age-gender groups go here...
    };

    const userAgeGroup = user.age;
    const userGender = user.gender;
    const userLocationKey = `${userAgeGroup}_${userGender}`;
    const userCoordinatesList = locationCoordinates[userLocationKey];

    const cluster = user.cluster;
    const bestCategories = clusterTopCategories[cluster] || [];

    const results = [];

    for (const coordinates of userCoordinatesList) {
      const { x: cluster_x, y: cluster_y } = coordinates;

      for (const category of bestCategories) {
        const places = await searchPlacesByKeyword(
          category,
          cluster_x,
          cluster_y,
          1,
          3,
        );
        results.push({ category, coordinates, places });
      }
    }

    return {
      categoryPlaces,
      results,
    };
  } catch (error) {
    console.error('Error in getAllSpots:', error);
    return {
      categoryPlaces: [],
    };
  }
};

module.exports = {
  getAllSpots,
};
