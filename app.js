const API = require('./api');
const { initModels } = require('./src/models');
require('dotenv').config(); //환경 변수 로드
const { sendNotifications } = require('./src/services/fcmService');

const firebaseAdmin = require('firebase-admin');
const schedule = require('node-schedule');

// FCM 초기화
const serviceAccount = require('./firebaseKey.json');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

(async () => {
  try {
    const api = new API();
    api.setController();
    api.listen();

    await initModels();
    console.log('Database synchronized successfully.');

    // 매 분마다 sendNotifications 호출
    schedule.scheduleJob('* * * * *', async () => {
      await sendNotifications();
    });

    process.on('SIGINT', async () => {
      await api.close();
      console.log('Server closed');
      process.exit(0);
    });
  } catch (error) {
    console.error('Error during server initialization:', error);
    process.exit(1);
  }
})();

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1); // Node.js 문서에 따라 필수
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // 애플리케이션 특정 로직, 오류발생, 또는 기타로직
});
