const data = require("../data.json");

const findIndexFromId = (id) => {
	return data.envelopes.findIndex((envelope) => {
		return envelope.id === Number(id);
	});
};

const deleteItem = (index, array) => {
	const arrayOfDeleted = array.splice(index, 1);
	return arrayOfDeleted.length === 0
		? new Error("index out of bounds")
		: arrayOfDeleted[0];
};

const createItemInArray = (object, array) => {
	object.id = array.length + 1;
	array.push(object);
};

//rest of them just functions for transfer feature
const increaseBudget = (amount, index) => {
	data.envelopes[index]["budget"] = data.envelopes[index]["budget"] + amount;
};
const decreaseBudget = (amount, index) => {
	if (amount < data.envelopes[index]["budget"]) {
		data.envelopes[index]["budget"] = data.envelopes[index]["budget"] - amount;
	} else {
		throw new Error(
			"amount of money you can transfer should be smaller than budget"
		);
	}
};

const transfer = (amount, fromIndex, toIndex) => {
	try {
		decreaseBudget(amount, fromIndex);
		increaseBudget(amount, toIndex);
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = { deleteItem, createItemInArray, transfer, findIndexFromId };
