const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");   // allow requests from browsers/tools

const app = express();
app.use(bodyParser.json());
app.use(cors());

// In-memory "database" (resets if server restarts)
let babies = {};

// 🍼 Create a new baby profile
app.post("/baby/create", (req, res) => {
  const { babyId, name, age, gender } = req.body;

  if (!babyId) {
    return res.status(400).json({ error: "babyId is required" });
  }

  babies[babyId] = {
    name: name || "Unnamed Baby",
    age: age || 0, // age in days
    gender: gender || "Other",
    stats: {
      health: 100,
      hunger: 100,
      thirst: 100,
      diaper: 100,
      hygiene: 100,
      sleep: 100,
      soothe: 100
    },
    caregivers: []
  };

  res.json({ message: "Baby created", baby: babies[babyId] });
});

// 🍼 Get baby profile
app.get("/baby/:babyId", (req, res) => {
  const { babyId } = req.params;
  if (!babies[babyId]) return res.status(404).json({ error: "Baby not found" });
  res.json(babies[babyId]);
});

// 🍼 Update a stat
app.post("/baby/:babyId/update", (req, res) => {
  const { babyId } = req.params;
  const { stat, value } = req.body;

  if (!babies[babyId]) return res.status(404).json({ error: "Baby not found" });
  if (!babies[babyId].stats.hasOwnProperty(stat)) {
    return res.status(400).json({ error: "Invalid stat" });
  }

  babies[babyId].stats[stat] = value;
  res.json({ message: `${stat} updated`, baby: babies[babyId] });
});

// 🍼 Add caregiver
app.post("/baby/:babyId/caregiver/add", (req, res) => {
  const { babyId } = req.params;
  const { caregiverName } = req.body;

  if (!babies[babyId]) return res.status(404).json({ error: "Baby not found" });

  if (!babies[babyId].caregivers.includes(caregiverName)) {
    babies[babyId].caregivers.push(caregiverName);
  }

  res.json({ message: "Caregiver added", baby: babies[babyId] });
});

// 🍼 Remove caregiver
app.post("/baby/:babyId/caregiver/remove", (req, res) => {
  const { babyId } = req.params;
  const { caregiverName } = req.body;

  if (!babies[babyId]) return res.status(404).json({ error: "Baby not found" });

  babies[babyId].caregivers = babies[babyId].caregivers.filter(
    (c) => c !== caregiverName
  );

  res.json({ message: "Caregiver removed", baby: babies[babyId] });
});

// Root check
app.get("/", (req, res) => {
  res.send("👶 BabyBond API is running 🐝");
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`BabyBond API running on port ${PORT}`);
});
