const db = require('../models');

const Join = async (id, email, password, deviceId, gender, job, age, hobby) => {
  try {
    // 먼저 해당 deviceId가 이미 존재하는지 확인
    const existingUser = await db.User.findOne({
      where: { deviceId: deviceId },
    });

    // deviceId가 이미 존재하면 저장하지 않고 null 반환
    if (existingUser) {
      throw new Error('Device ID already in use');
    }

    // 취미를 콤마로 구분된 문자열로 저장
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
    // 주어진 id로 등록된 다른 deviceId가 있는지 확인
    const existingUser = await db.User.findOne({
      where: {
        id: id,
        password: password,
        deviceId: { [db.Sequelize.Op.ne]: deviceId }, // 다른 deviceId가 있는지 확인
      },
    });

    // 만약 다른 deviceId가 이미 등록되어 있으면 에러 발생
    if (existingUser) {
      throw new Error(
        'This account is already associated with another device.',
      );
    }

    // 정상적인 로그인 처리
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
