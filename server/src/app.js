const express = require("express");
const cors = require("cors");

const assignRoutes = require("./routes/routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use(assignRoutes);

module.exports = app;