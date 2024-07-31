const express = require('express');
const controllers = require('./src/controllers');

require('dotenv').config(); // 환경 변수 로드

module.exports = class API {
  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  setController() {
    this.app.use('/api/v1/spots', controllers.v1.SpotController);
    this.app.use('/api/v1/users', controllers.v1.UserController);
    this.app.use('/api/v1/diary', controllers.v1.DiaryController);
    this.app.use('/api/v1/survey', controllers.v1.SurveyController);
    this.app.use('/api/v1/userfcmtoken', controllers.v1.UserFCMTokenController);
  }

  listen() {
    const PORT = 3000;
    this.server = this.app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }

  async close() {
    return new Promise((resolve) => {
      this.server.close(() => {
        resolve();
      });
    });
  }
};
