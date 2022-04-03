const express = require('express');
const asyncHandler = require('express-async-handler');

const {
  updateUser,
  getUser,
  getAllUsers,
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter.put('/:walletAddress', asyncHandler(updateUser));
userRouter.get('/:walletAddress', asyncHandler(getUser));
userRouter.get('/users/all', asyncHandler(getAllUsers));

module.exports = userRouter;