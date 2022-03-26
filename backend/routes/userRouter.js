const express = require('express');
const asyncHandler = require('express-async-handler');

const {
  register,
  updateProfile,
  getUser,
  getAllUsers,
  updateFavorites,
  getMyFavorites
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/register', asyncHandler(register));
userRouter.put('/:walletAddress', asyncHandler(updateProfile));
userRouter.get('/:walletAddress', asyncHandler(getUser));
userRouter.get('/all', asyncHandler(getAllUsers));

userRouter.get('/favorites/:walletAddress', authRequired(), asyncHandler(getMyFavorites));
userRouter.post('/favorites', authRequired(), asyncHandler(updateFavorites));

module.exports = userRouter;