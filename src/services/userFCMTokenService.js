const db = require('../models');

const saveUserFCMToken = async (userId, token) => {
  try {
    const [created] = await db.UserFCMToken.findOrCreate({
      where: { token },
      defaults: { userId: userId, token },
    });
    return created;
  } catch (error) {
    throw new Error('Error saving token: ' + error.message);
  }
};

const getAllUserFCMTokens = async () => {
  try {
    const userTokens = await db.UserFCMToken.findAll();
    return userTokens;
  } catch (error) {
    throw new Error('Error fetching tokens: ' + error.message);
  }
};

module.exports = {
  saveUserFCMToken,
  getAllUserFCMTokens,
};
