const db = require('../models');

const Join = async (id, email, password, deviceId, gender, job, age, hobby) => {
  try {
    // 예: 취미를 콤마로 구분된 문자열로 저장
    const hobbies = hobby ? hobby.join(',') : null;

    const join = await db.User.create({
      id: id,
      email: email,
      password: password,
      deviceId: deviceId,
      gender: gender,
      job: job,
      age: age,
      hobby: hobbies,
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
