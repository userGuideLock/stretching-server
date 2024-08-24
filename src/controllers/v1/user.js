const express = require('express');
const router = express.Router();
const { UserService } = require('../../services');

router.post('/join', async (req, res) => {
  try {
    const {
      id,
      email,
      password,
      deviceId,
      gender,
      job,
      age,
      hobby,
      hasCar = false, // 기본값: false (자동차가 없는 경우)
      eduLevel = 3, // 기본값: 1 (최저 교육 수준)
      monAveInc = 2, // 기본값: 1 (최저 소득 수준)
      famNum = 2, // 기본값: 1 (1인 가족)
      marryStatus = 1, // 기본값: 1 (미혼)
    } = req.body;

    // 필수 입력값 체크
    if (!id || !email || !password || !deviceId) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    // hobby가 배열인지 확인
    if (hobby && !Array.isArray(hobby)) {
      return res
        .status(400)
        .json({ error: 'Hobby must be an array of strings' });
    }

    // UserService.Join 호출
    const user = await UserService.Join({
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
    });

    if (user) {
      return res.status(201).json({ message: 'User successfully created' });
    } else {
      return res.status(400).json({ error: 'User creation failed' });
    }
  } catch (err) {
    if (err.message === 'Device ID already in use') {
      return res.status(400).json({ error: err.message });
    } else {
      console.error('Error during user creation:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    const { id, password, deviceId } = req.body;

    // 필수 입력값 체크
    if (!id || !password || !deviceId) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    const user = await UserService.Login(id, password, deviceId);

    if (user) {
      return res.status(200).json({ message: 'User successfully logged in' });
    } else {
      return res.status(400).json({ error: 'User login failed' });
    }
  } catch (err) {
    if (
      err.message === 'This account is already associated with another device.'
    ) {
      return res.status(400).json({ error: err.message });
    } else {
      console.error('Error during login:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
});

module.exports = router;
