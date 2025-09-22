const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Test route
app.get("/", (req, res) => {
  res.send("BabyBond API is running 🚼🐝");
});

// Example: log baby care actions
app.post("/log", (req, res) => {
  const { babyId, caregiver, action, details } = req.body;

  if (!babyId || !caregiver || !action) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  console.log("Care log received:", { babyId, caregiver, action, details });

  res.json({
    success: true,
    message: "Care log saved successfully!",
    data: { babyId, caregiver, action, details }
  });
});

app.listen(PORT, () => {
  console.log(`BabyBond API running on port ${PORT}`);
});
