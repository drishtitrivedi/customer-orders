const express = require("express");
const db = require("../db");
const logindb = require("../db/authenticate");
const offices = require("../db/offices");
const router = express.Router();

// -------------------------------------------- HTTP GET request ---------------------------------
router.get("/", (req, res) => {
  res.json({ id: 1, name: "Drishti" });
});

router.get("/customers", async (req, res, next) => {
  try {
    let result = await db.all();
    res.json(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/offices", async (req, res, next) => {
  try {
    let result = await offices.all();
    res.json(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/customers/:id", async (req, res, next) => {
  try {
    let result = await db.one(parseInt(req.params.id));
    res.json(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/authenticate/:username/:password", async (req, res, next) => {
  try {
    let result = await logindb.one(req.params.username, req.params.password);
    res.json(result);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
