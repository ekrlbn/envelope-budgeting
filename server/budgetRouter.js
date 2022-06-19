const express = require("express");
const budgetRouter = express.Router();
const data = require("../data.json");

module.exports = budgetRouter;

budgetRouter.get("/", (req, res) => {
	res.status(200).send({ totalBudget: data.totalBudget });
});

budgetRouter.put("/", (req, res) => {
	const totalBudget = Number(req.body.totalBudget);
	if (totalBudget > 0) {
		data.totalBudget = Number(totalBudget);
		res.status(204).send();
	} else {
		res.status(404).send();
	}
});
