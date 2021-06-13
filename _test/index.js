const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());

app.use(bodyParser());

app.use("/public", express.static("public"));

app.get("/list", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Main Reports",
    },
    {
      id: 2,
      title: "Primary Reports",
    },
    {
      id: 3,
      title: "Small Reports",
    },
    {
      id: 4,
      title: "Big Reports",
    },
  ]);
});

app.get("/getReports/:groupId", (req, res) => {
  res.json([
    {
      id: 12,
      title: "Hourly Reports",
    },
    {
      id: 24,
      title: "Weekly Reports ",
    },
    {
      id: 31,
      title: "Daily Reports ",
    },
    {
      id: 42,
      title: "Monthly Reports ",
    },
  ]);
});

app.post("/save", (req, res) => {
  res.sendStatus(200);
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

app.listen(9000, () => {
  console.log("App Started on port 9000");
});
