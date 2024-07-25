const express = require('express');
const router = express.Router();
const { UserService } = require('../../services');

router.post('/join', async (req, res) => {
  try {
    const { id, email, password } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Id is required' });
    }

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const user = await UserService.Join(id, email, password);

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
    const { id, password } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Id is required' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const user = await UserService.Login(id, password);

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
