const API = require('./api');
const { initModels } = require('./src/models');

require('dotenv').config(); //환경 변수 로드

(async () => {
  try {
    const api = new API();
    api.setController();
    api.listen();

    await initModels();
    console.log('Database synchronized successfully.');

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
