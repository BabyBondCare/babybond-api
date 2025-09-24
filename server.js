const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ This is all you need — no bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const babyRoutes = require("./routes/baby");
app.use("/", babyRoutes);

app.listen(PORT, () => {
  console.log(`BabyHUD API running on port ${PORT}`);
});
