const db = require('../models');

const Join = async (id, email, password, deviceId, gender, job, age, hobby) => {
  try {
    const join = await db.User.create({
      id: id,
      email: email,
      password: password,
      deviceId: deviceId,
      gender: gender,
      job: job,
      age: age,
      hobby: hobby,
    });

    return join;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const Login = async (id, password, deviceId) => {
  try {
    const login = await db.User.findOne({
      where: { id: id, password: password, deviceId: deviceId },
    });
    return login;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  Join,
  Login,
};
