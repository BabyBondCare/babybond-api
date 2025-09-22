const express = require("express");
const router = express.Router();
const db = require("../data/memoryDB");

// --- LOGIN ---
router.post("/login", (req, res) => {
  const { baby_id, hud_type } = req.body;
  if (!baby_id) return res.status(400).json({ error: "Missing baby_id" });

  if (!db.babies[baby_id]) {
    db.babies[baby_id] = {
      baby_id,
      hud_type,
      stats: {
        health: 100,
        hunger: 100,
        thirst: 100,
        diaper: 100,
        hygiene: 100,
        sleep: 100,
        soothe: 100,
      },
      sick: false,
      logs: [],
      last_login: new Date().toISOString(),
    };
  } else {
    db.babies[baby_id].last_login = new Date().toISOString();
  }

  return res.json(db.babies[baby_id]);
});

// --- LOGOUT ---
router.post("/logout", (req, res) => {
  const { baby_id } = req.body;
  if (!baby_id || !db.babies[baby_id]) {
    return res.status(400).json({ error: "Invalid baby_id" });
  }
  return res.json({ message: "Baby logged out", baby: db.babies[baby_id] });
});

// --- STATUS ---
router.get("/status", (req, res) => {
  const { baby_id } = req.query;
  if (!baby_id || !db.babies[baby_id]) {
    return res.status(404).json({ error: "Baby not found" });
  }
  return res.json(db.babies[baby_id]);
});

// --- UPDATE (Feed, Sleep, Diaper, Meds) ---
router.post("/update", (req, res) => {
  const { baby_id, action } = req.body;
  if (!baby_id || !db.babies[baby_id]) {
    return res.status(404).json({ error: "Baby not found" });
  }

  let baby = db.babies[baby_id];

  switch (action) {
    case "feed":
      baby.stats.hunger = Math.min(100, baby.stats.hunger + 20);
      baby.logs.push({ action: "feed", time: new Date().toISOString() });
      break;
    case "sleep":
      baby.stats.sleep = Math.min(100, baby.stats.sleep + 20);
      baby.logs.push({ action: "sleep", time: new Date().toISOString() });
      break;
    case "diaper":
      baby.stats.diaper = 100;
      baby.logs.push({ action: "diaper change", time: new Date().toISOString() });
      break;
    case "medicine":
      baby.stats.health = Math.min(100, baby.stats.health + 40);
      baby.sick = false;
      baby.logs.push({ action: "medicine", time: new Date().toISOString() });
      break;
    default:
      return res.status(400).json({ error: "Unknown action" });
  }

  return res.json(baby);
});

// --- LOGS ---
router.get("/logs", (req, res) => {
  const { baby_id } = req.query;
  if (!baby_id || !db.babies[baby_id]) {
    return res.status(404).json({ error: "Baby not found" });
  }
  return res.json({ logs: db.babies[baby_id].logs });
});

module.exports = router;
