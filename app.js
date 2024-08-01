const API = require('./api');
const { initModels } = require('./src/models');
require('dotenv').config(); //환경 변수 로드
const { sendNotifications } = require('./src/services/fcmService');
const firebaseAdmin = require('firebase-admin');
const schedule = require('node-schedule');
const path = require('path');
const fs = require('fs');
// Create firebaseKey.json dynamically from environment variables
const firebaseConfig = {
  type: process.env.FCM_TYPE,
  project_id: process.env.FCM_PROJECT_ID,
  private_key_id: process.env.FCM_PRIVATE_KEY_ID,
  private_key: process.env.FCM_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FCM_CLIENT_EMAIL,
  client_id: process.env.FCM_CLIENT_ID,
  auth_uri: process.env.FCM_AUTH_URI,
  token_uri: process.env.FCM_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FCM_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FCM_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FCM_UNIVERSE_DOMAIN,
};

const firebaseKeyPath = path.resolve(__dirname, 'firebaseKey.json');
fs.writeFileSync(firebaseKeyPath, JSON.stringify(firebaseConfig));

// FCM initialization
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseKeyPath),
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
