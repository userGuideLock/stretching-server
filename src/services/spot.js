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
          radius: 1000,
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
        { x: 126.9538519, y: 37.4489926 },
        { x: 126.9287583, y: 37.4832519 },
        { x: 126.921127, y: 37.550912 },
        { x: 128.5955436, y: 35.8708214 },
        { x: 129.0638741, y: 35.1554021 },
      ],
      '20대_여': [
        { x: 126.9472851, y: 37.4585522 },
        { x: 126.9287583, y: 37.4832519 },
        { x: 126.9244874, y: 37.5466701 },
        { x: 128.6069999, y: 35.8616593 },
        { x: 129.0638741, y: 35.1554021 },
      ],
      '30대_남': [
        { x: 126.9141547, y: 37.5318046 },
        { x: 126.968395, y: 37.528786 },
        { x: 127.0603993, y: 37.5067853 },
        { x: 126.9678039, y: 37.5664235 },
        { x: 126.9112393, y: 37.0891196 },
      ],
      '30대_여': [
        { x: 126.9033411, y: 37.5170751 },
        { x: 127.0020559, y: 37.5390298 },
        { x: 127.0362922, y: 37.5226393 },
        { x: 126.9805633, y: 37.5620577 },
        { x: 127.1109475, y: 37.1599476 },
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
    const seenIds = new Set(); // Set to keep track of seen IDs

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

        // Filter out places with duplicate IDs
        const uniquePlaces = places.filter((place) => {
          if (seenIds.has(place.id)) {
            return false;
          } else {
            seenIds.add(place.id);
            return true;
          }
        });

        if (uniquePlaces.length > 0) {
          results.push({ category, coordinates, places: uniquePlaces });
        }
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
