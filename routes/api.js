const express = require('express');
const router = express.Router();

// Define a GET endpoint at /api/hello
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello, World55!' });
});

module.exports = router;