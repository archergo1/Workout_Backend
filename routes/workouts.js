const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "GET ALL WORKOUTS" });
});

router.get("/:id", (req, res) => {
  res.json({ message: "GET A SINGLE WORKOUT" });
});

router.post("/", (req, res) => {
  res.json({ message: "POST A SINGLE WORKOUT" });
});

router.delete("/:id", (req, res) => {
  res.json({ message: "DELETE A SINGLE WORKOUT" });
});

router.patch("/:id", (req, res) => {
  res.json({ message: "UPDATE A SINGLE WORKOUT" });
});

module.exports = router;
