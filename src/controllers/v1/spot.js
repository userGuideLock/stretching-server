const express = require('express');
const router = express.Router();
const SpotService = require('../../services/spot');

router.get('/', async (req, res) => {
  const { username, x_pos, y_pos, page = 1, size = 10 } = req.query;
  try {
    const result = await SpotService.getAllSpots(
      username,
      x_pos,
      y_pos,
      page,
      size,
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
