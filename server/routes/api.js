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

// All route
//
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

// Individual POI route
//
router.get('/pois/:id', function(req, res) {
  console.log('requesting a specific article');
  poi.findById(req.params.id)
    .exec(function(err, poi) {
      if (err) {
        console.log('Oops, error getting the specific POI');
      } else {
        res.json(poi)
      }
    })
})

// Creating a POI route
//
router.post('/create', function(req, res) {
  console.log('Posting(creating) a POI')
  var newPOI = new poi(); // creating a new MongoDB model, not Poi class
  newPOI.name = req.body.name;
  newPOI.description = req.body.description;
  newPOI.latitude = req.body.latitude;
  newPOI.longitude = req.body.longitude;
  newPOI.tags = req.body.tags;
  newPOI.save(function(err, poi) {
    if (err) {
      console.log('Error inserting the POI');
    } else {
      // A response is needed, or the subscription will not be filled.
      res.json(poi);
    }
  })


})

// Update a POI route
//
router.post('/update/:id', function(req, res) {
  console.log('Updating a POI');

  poi.findById(req.params.id)
    .exec(function(err, poi) {
      if (err) {
        console.log('Could not find the POI in the DB')
      } else {
        poi.name = req.body.name;
        poi.description = req.body.description;
        poi.save();
        res.json(poi); // the response
      }
    });
})



module.exports = router;