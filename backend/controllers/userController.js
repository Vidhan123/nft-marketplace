const User = require("../models/userModel");

exports.updateUser = async (req, res) => {
	const { walletAddress } = req.params;
	console.log("req",req.body)
	const ad = await User.findOne({ walletAddress: walletAddress });
	console.log("ad",ad)
  if(!ad.isAdmin && req.body.isAdmin) req.body.isAdmin = false;

	const updatedUser = await User.findByIdAndUpdate(ad._id, req.body, {
		new: true,
	}).populate(
		'followers following'
	);
	return res.status(200).json(updatedUser);
};

exports.getUser = async (req, res) => {
	const { walletAddress } = req.params;
	console.log("user wallerAddress",req.params)
	const user = await User.findOne({ walletAddress: walletAddress }).populate(
		'followers following'
	);
	console.log("user",user)
	if(!user) {
		// Create user
		let newUser = new User({
			walletAddress
		});
		await newUser.save();

		res.status(200).json(newUser);
	}
	else {
		res.status(200).json(user);
	}
};

exports.getAllUsers = async (req, res) => {
	console.log("all users")
  const items = await User.find().populate('followers following');
console.log(items)
  res.status(200).json(items);
};