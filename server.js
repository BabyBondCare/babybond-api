const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Temporary in-memory storage
let babyStats = {
  health: 100,
  hunger: 100,
  thirst: 100,
  diaper: 100,
  hygiene: 100,
  sleep: 100,
  soothe: 100
};

// Endpoint to get current stats
app.get("/stats", (req, res) => {
  res.json(babyStats);
});

// Endpoint to update a specific stat
app.post("/update", (req, res) => {
  const { stat, value } = req.body;
  if (babyStats.hasOwnProperty(stat)) {
    babyStats[stat] = value;
    return res.json({ message: `${stat} updated`, stats: babyStats });
  }
  res.status(400).json({ error: "Invalid stat" });
});

// Render sets the PORT automatically
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`BabyBond API running on port ${PORT}`);
});
