const db = require('../models');
const { oneHotEncode } = require('../ml/encoder');
const { predictCluster } = require('../ml/kmeans');

const Join = async (userData) => {
  const {
    id,
    email,
    password,
    deviceId,
    gender,
    job,
    age,
    hobby,
    hasCar,
    eduLevel,
    monAveInc,
    famNum,
    marryStatus,
  } = userData;

  try {
    const existingUser = await db.User.findOne({ where: { deviceId } });

    if (existingUser) {
      throw new Error('Device ID already in use');
    }

    const hobbies = hobby ? hobby.join(',') : null;

    const intAge = parseInt(age.substring(0, 2), 10) + 5 || 0;

    const dataPoint = [
      intAge,
      1,
      parseInt(hasCar),
      eduLevel,
      monAveInc,
      famNum,
      marryStatus,
    ];

    const encodedDataPoint = oneHotEncode(dataPoint);
    const predictedCluster = predictCluster(encodedDataPoint);

    return await db.User.create({
      id,
      email,
      password,
      deviceId,
      gender,
      job,
      age,
      hobby: hobbies,
      hasCar,
      eduLevel,
      monAveInc,
      famNum,
      marryStatus,
      cluster: predictedCluster,
    });
  } catch (err) {
    console.error('Error in Join function:', err);
    throw err;
  }
};

const Login = async (id, password, deviceId) => {
  try {
    const existingUser = await db.User.findOne({
      where: {
        id,
        password,
        deviceId: { [db.Sequelize.Op.ne]: deviceId },
      },
    });

    if (existingUser) {
      throw new Error(
        'This account is already associated with another device.',
      );
    }

    return await db.User.findOne({
      where: { id, password, deviceId },
    });
  } catch (err) {
    console.error('Error in Login function:', err);
    throw err;
  }
};

module.exports = {
  Join,
  Login,
};
