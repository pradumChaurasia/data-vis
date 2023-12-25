var express = require('express');
var router = express.Router();
var connectToDatabase = require('../db/mongodb').connectToDatabase;
var ObjectId = require('bson').ObjectId;

router.get('/api/data', function(req, res) {
  try {
    connectToDatabase()
      .then(function(db) {
        return db.collection('data-visual').find({}).toArray();
      })
      .then(function(data) {
        res.json(data);
      })
      .catch(function(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
