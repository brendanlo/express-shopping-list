"use strict";

const express = require("express");

const db = require("./fakeDb");
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
  return res.json(db.items.find(req.params.name));
})

/** accepts JSON body */