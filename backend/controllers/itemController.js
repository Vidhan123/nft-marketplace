const Item = require("../models/itemModel");

exports.updateItem = async (req, res) => {
	const { itemId } = req.params;

	const updatedItem = await Item.findOneAndUpdate({ itemId: itemId }, req.body, {
		new: true,
	})
	return res.status(200).json(updatedItem);
};

exports.getItem = async (req, res) => {
	const { itemId } = req.params;
	
  const item = await Item.findOne({ itemId: itemId })
	if(!item) {
		// Create user
		let newItem = new Item({
			itemId
		});
		await newItem.save();

		res.status(200).json(newItem);
	}
	else {
		res.status(200).json(item);
	}
};