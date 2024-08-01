const db = require('../models');

const saveUserFCMToken = async (req, res) => {
  const { userId, token } = req.body;
  if (!userId || !token) {
    return res.status(400).json({ code: 1, message: 'Invalid request' });
  }

  //유저 조회
  const user = await db.User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(400).json({ code: 2, message: 'User not found' });
  }

  // 이미 해당 토큰이 저장되어 있는지 확인
  const tokenExist = await db.UserFCMToken.findOne({
    where: { token },
  });
  if (tokenExist) {
    return res.status(400).json({ code: 3, message: 'Token already exists' });
  }

  try {
    // 토큰 저장
    await db.UserFCMToken.create({
      userId,
      token,
    });

    return res.status(200).json({ message: 'Token saved' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error saving token' + error.message });
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
