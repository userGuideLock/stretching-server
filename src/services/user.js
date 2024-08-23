const db = require('../models');
const { oneHotEncode } = require('../ml/encoder');
const { predictCluster } = require('../ml/kmeans');

const Join = async (
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
) => {
  try {
    // 먼저 해당 deviceId가 이미 존재하는지 확인
    const existingUser = await db.User.findOne({
      where: { deviceId: deviceId },
    });

    // deviceId가 이미 존재하면 저장하지 않고 에러를 던짐
    if (existingUser) {
      throw new Error('Device ID already in use');
    }

    // 취미를 콤마로 구분된 문자열로 저장
    const hobbies = hobby ? hobby.join(',') : null;

    // 나이 처리
    const agePrefix = parseInt(age.substring(0, 2), 10);
    let intAge = 0;

    if (!isNaN(agePrefix)) {
      intAge = agePrefix + 5; // 기본 연령대 중앙값 계산 (예: "20대"라면 25)
    }

    // 클러스터링을 위한 데이터 포인트 준비
    const dataPoint = [
      intAge,
      1, // 직종을 1로 고정
      hasCar,
      eduLevel,
      monAveInc,
      famNum,
      marryStatus,
    ];

    // 원-핫 인코딩 적용
    const encodedDataPoint = oneHotEncode(dataPoint);

    // 클러스터 예측
    const predictedCluster = predictCluster(encodedDataPoint);

    // 유저 생성, 클러스터 값 포함
    return await db.User.create({
      id: id,
      email: email,
      password: password,
      deviceId: deviceId,
      gender: gender,
      job: job,
      age: age,
      hobby: hobbies,
      hasCar: hasCar,
      eduLevel: eduLevel,
      monAveInc: monAveInc,
      famNum: famNum,
      marryStatus: marryStatus,
      cluster: predictedCluster, // 클러스터 값 포함
    });
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
