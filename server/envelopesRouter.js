const express = require("express");
const envelopeRouter = express.Router();
const data = require("../data.json");

const {
	deleteItem,
	createItemInArray,
	transfer,
	findIndexFromId,
} = require("./helperFunctions");
module.exports = envelopeRouter;

const validateBody = (req, res, next) => {
	if (Object.hasOwn(req.body, "title") && Object.hasOwn(req.body, "budget")) {
		req.body = {
			title: String(req.body.title),
			budget: Number(req.body.budget),
		};
		next();
	} else {
		res.sendStatus(400);
	}
};

//validates whether there is a object has id same with the id in the parameters
envelopeRouter.param("envelopeId", (req, res, next, id) => {
	const index = findIndexFromId(id);

	if (index !== -1) {
		req.index = index;
		next();
	} else {
		new Error("there is no such a envelope");
		res.status(404).send("there is no such a envelope");
	}
});

envelopeRouter.get("/", (req, res) => {
	res.status(200).send({ envelopes: data.envelopes });
});

envelopeRouter.get("/:envelopeId", (req, res) => {
	res.status(200).send(data.envelopes[req.index]);
});

envelopeRouter.post("/", validateBody, (req, res) => {
	createItemInArray(req.body, data.envelopes);
	res.status(201).send();
});

envelopeRouter.put("/:envelopeId", validateBody, (req, res) => {
	data.envelopes[req.index].title = req.body.title;
	data.envelopes[req.index].budget = req.body.budget;
	res.status(204).send();
});

envelopeRouter.delete("/:envelopeId", (req, res) => {
	deleteItem(req.index, data.envelopes);
	res.status(204).send();
});

envelopeRouter.put("/transfer/:from/:to", (req, res) => {
	const fromIndex = findIndexFromId(req.params.from);

	const toIndex = findIndexFromId(req.params.to);

	const amount = Number(req.body.amount);
	transfer(amount, fromIndex, toIndex);
	res.status(204).send();
});
