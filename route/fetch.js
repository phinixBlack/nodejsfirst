const express = require('express');
const router = express.Router();
const redis = require('../Redis/config');
const fetchUserDataFromDatabase = require('../Utilities/fetchUserDataFromDatabase');

router.get('/', async (req, res) => {
  try {
    const redisKey = "list";
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;

    // Calculate the start and end indexes for fetching data
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    // Check if the data is already in Redis
    const count = await redis.llen(redisKey);
    if (count == 0) {
      // Data is not in Redis, fetch it from the database
      const userData = await fetchUserDataFromDatabase();

      // Store the data in the Redis list
      const redisMulti = redis.multi();
      userData.forEach((user) => {
        redisMulti.rpush(redisKey, JSON.stringify(user));
      });
      await redis.expire(redisKey,10);
      redisMulti.exec((err, replies) => {
        if (err) {
          res.status(500).json({ error: 'Error fetching and caching users' });
        } else {
          res.json(userData);
        }
      });

    } else if (count > 0) {
      const cachedUsers = await redis.lrange(redisKey, start, end);
      const users = cachedUsers.map((userData) => JSON.parse(userData));
      res.json(users);
    } else {
      const users = {};
      res.json(users);
    }
  } catch (error) {
    console.error('Error fetching and caching users: ' + error.message);
    res.status(500).json({ error: 'Error fetching and caching users' });
  }
});

module.exports = router;
