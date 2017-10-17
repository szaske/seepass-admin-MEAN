const express = require('express');
const router = express.Router();

// A node.js package for connecting to MongoDB 
// and also offers object modeling
const mongoose = require('mongoose');
const poi = require('../models/poi');

const db = "mongodb://spuser:spuser123@seattle-passport-shard-00-00-xb4nv.mongodb.net:27017,seattle-passport-shard-00-01-xb4nv.mongodb.net:27017,seattle-passport-shard-00-02-xb4nv.mongodb.net:27017/SeaPassDB?ssl=true&replicaSet=seattle-passport-shard-0&authSource=admin"

mongoose.Promise = global.Promise;
mongoose.connect(db, function(err) {
  if (err) {
    console.log('Error connecting');
  }
});

router.get('/all', function(req, res) {

  poi.find({})
    .exec(function(err, pois) {
      if (err) {
        console.log('Error getting pois');
      } else {
        console.log(pois);
        res.json(pois);
      }
    })
})

module.exports = router;