"use strict";

const express = require("express");
const db = require("./fakeDb");
const { NotFoundError, BadRequestError } = require("./expressError");
const router = new express.Router();

/** return the list of shopping items from the db */
router.get('/', function (req, res) {
  return res.json({ items: db.items });
})

/** accepts JSON body, adds an item, and returns the JSON body */
router.post('/', function (req, res) {
  db.items.push(req.body);
  return res.json({ added: req.body });
})

/** returns a single item from the params */
router.get('/:name', function (req, res) {
  return res.json(db.items.find(function (item) {
    return item.name === req.params.name;
  }))
});

router.patch('/:name', function(req, res){
  const updatedItem = db.items.find(function(item){
    if(item.name === req.params.name){
      item.price === req.body.price;
      item.name === req.body.name;
      return item;
    }else{
      throw new NotFoundError;
    }
  })
  return res.json({update: updatedItem})
})

module.exports = router;
