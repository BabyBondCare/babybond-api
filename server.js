const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Make sure these two lines are here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const babyRoutes = require("./routes/baby");
app.use("/", babyRoutes);

app.listen(PORT, () => {
  console.log(`BabyHUD API running on port ${PORT}`);
});
