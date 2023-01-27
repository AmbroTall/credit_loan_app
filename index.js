const express = require("express");
const app = express();
const authRoute = require("./routes/Authentication");
const userRoute = require("./routes/Users");
const docsRoute = require("./routes/Documents");
const dispRoute = require("./routes/Dispute");
app.use(express.json());
const cors = require("cors");
app.use(cors());

const { sequelize } = require("./models");

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/docs", docsRoute);
app.use("/dispute", dispRoute);

port = process.env.PORT || "5000";
app.listen("5000", async () => {
  console.log("Server up on http://localhost:5000");
  // await sequelize.authenticate();
  await sequelize.sync({ force: true });
  // await sequelize.sync();
  console.log("Database Connected!");
});
