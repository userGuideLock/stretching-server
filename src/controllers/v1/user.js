const express = require('express');
const router = express.Router();
const { UserService } = require('../../services');

router.post('/join', async (req, res) => {
  try {
    const { id, email, password, deviceId, gender, job, age, hobby } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Id is required' });
    }

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    if (!deviceId) {
      return res.status(400).json({ error: 'deviceId is required' });
    }

    // hobby가 배열인지 확인
    if (hobby && !Array.isArray(hobby)) {
      return res
        .status(400)
        .json({ error: 'Hobby must be an array of strings' });
    }

    const user = await UserService.Join(
      id,
      email,
      password,
      deviceId,
      gender,
      job,
      age,
      hobby,
    );

    if (user) {
      res.status(201).json({ message: 'User successfully created' });
    } else {
      res.status(400).json({ error: 'User creation failed' });
    }
  } catch (err) {
    console.error('Error during user creation:', err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { id, password, deviceId } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Id is required' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    if (!deviceId) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const user = await UserService.Login(id, password, deviceId);

    if (user) {
      res.status(201).json({ message: 'User successfully login' });
    } else {
      res.status(400).json({ error: 'User login failed' });
    }
  } catch (err) {
    console.error('Error during user login:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
