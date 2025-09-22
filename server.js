const express = require("express");
const bodyParser = require("body-parser");

const babyRoutes = require("./routes/baby");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/", babyRoutes);

app.listen(PORT, () => {
  console.log(`BabyHUD API running on port ${PORT}`);
});
