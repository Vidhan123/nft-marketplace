const User = require("../models/userModel");

exports.register = async (req, res, next) => {
	const { walletAddress } = req.body;
  // Create user
  let user = new User({
    walletAddress
  });
  await user.save();

	res.status(200)
		.json({ success: true, user });
};