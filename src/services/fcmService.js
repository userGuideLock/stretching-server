const admin = require('firebase-admin');
const moment = require('moment-timezone');
const userFCMTokenService = require('./userFCMTokenService');

const sendNotifications = async () => {
  try {
    // 현재 시간을 한국 시간(KST)으로 변환
    const now = moment.tz('Asia/Seoul');

    // 한국 시간으로 오후 6시인지 확인
    if (now.hour() === 18 && now.minute() === 0) {
      const userTokens = await userFCMTokenService.getAllUserFCMTokens();

      userTokens.forEach((userToken) => {
        const message = {
          notification: {
            title: '저녁 6시 알림',
            body: '저녁 6시입니다. 하루를 정리하세요!',
          },
          token: userToken.token,
        };

        admin
          .messaging()
          .send(message)
          .then((response) => {
            console.log('Successfully sent message:', response);
          })
          .catch((error) => {
            console.log('Error sending message:', error);
          });
      });
    }
  } catch (error) {
    console.log('Error fetching tokens:', error);
  }
};

module.exports = {
  sendNotifications,
};
