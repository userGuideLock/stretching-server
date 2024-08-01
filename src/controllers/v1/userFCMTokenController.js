const userFCMTokenService = require('../../services/userFCMTokenService');
const express = require('express');
const router = express.Router();

router.post('/savetoken', async (req, res) => {
  await userFCMTokenService.saveUserFCMToken(req, res);
  return res;
});

module.exports = router;
