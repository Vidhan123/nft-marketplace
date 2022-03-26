const express = require('express');
const asyncHandler = require('express-async-handler');

const {
  getItem,
  updateItem
} = require('../controllers/itemController');

const itemRouter = express.Router();

itemRouter.get('/:itemId', asyncHandler(getItem));
itemRouter.put('/:itemId', asyncHandler(updateItem));

module.exports = itemRouter;