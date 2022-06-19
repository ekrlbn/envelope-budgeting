const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const logger = require("morgan");

app.use(logger("dev"));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("HELLO, WORLD");
});

app.listen(PORT, () => {
	console.log(`server listening from port ${PORT}`);
});
