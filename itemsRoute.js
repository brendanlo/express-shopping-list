"use strict";

const express = require("express");
const db = require("./fakeDb");
const { NotFoundError } = require("./expressError");
const router = new express.Router();

//give examples of return for docstring, what it takes and returns!!
/** return the list of shopping items from the db */
router.get('/', function (req, res) {
  return res.json({ items: db.items });
})

/** accepts JSON body, adds an item, and returns the JSON body */
router.post('/', function (req, res) {
  //check if req.body JS obj or json but should be JS obj, debugger or console.log
  //explicit of selecting of what we need in req.body
  db.items.push(req.body);
  return res.status(201).json({ added: req.body });
})

/** returns a single item from the params */
router.get('/:name', function (req, res) {
  //arrow func!!
  return res.json(db.items.find(function (item) {
    return item.name === req.params.name;
  }));
});

/**accept JSON body and update the item in the db.items */
router.patch('/:name', function (req, res) {
  const item = db.items.find(function (item) {
    return item.name === req.params.name;
  });

  if (!item) throw new NotFoundError("item not found");

  item.price = req.body.price || item.price;
  item.name = req.body.name || item.name;

  return res.json({ updated: item });
})

/**accept url params and delete/remove the item in db.items */
router.delete('/:name', function (req, res) {
  const itemLoc = db.items.find(function (item, index) {
    if (item.name === req.params.name) {
      return index;
    }
  });

  db.items.splice(itemLoc, 1);
  return res.json({ message: "deleted" });
});


module.exports = router;
