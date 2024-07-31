const userFCMTokenService = require('../../services/userFCMTokenService');
const express = require('express');
const router = express.Router();

router.post('/savetoken', async (req, res) => {
  const { userId, token } = req.body;
  try {
    const created = await userFCMTokenService.saveUserFCMToken(userId, token);
    if (created) {
      res.status(200).send({ message: 'Token saved successfully' });
    } else {
      res.status(200).send({ message: 'Token already exists' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error saving token', error });
  }
});

module.exports = router;
