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
			title: "گزارشات اصلی",
		},
		{
			id: 2,
			title: "گزارشات مهم",
		},
		{
			id: 3,
			title: "گزارشات بزرگ",
		},
		{
			id: 4,
			title: "گزارشات کوچک",
		},
	]);
});

app.get("/getReports/:groupId", (req, res) => {
	res.json([
		{
			id: 12,
			title: "گزارشات ساعتی",
		},
		{
			id: 24,
			title: "گزارشات روزانه",
		},
		{
			id: 31,
			title: "گزارشات هفتگی",
		},
		{
			id: 42,
			title: "گزارشات ماهیانه",
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
