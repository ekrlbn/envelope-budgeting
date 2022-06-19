const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const logger = require("morgan");

const envelopeRouter = require("./server/envelopesRouter");
const budgetRouter = require("./server/budgetRouter");

app.use(logger("dev"));
app.use(bodyParser.json());

app.use("/envelopes", envelopeRouter);
app.use("/totalBudget", budgetRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("HELLO, WORLD");
});

app.listen(PORT, () => {
	console.log(`server listening from port ${PORT}`);
});
