const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

// Routes for CRUD operations
router.get('/', itemsController.getItems);
router.post('/', itemsController.createItem);
router.put('/:id', itemsController.updateItem);
router.patch('/:id', itemsController.patchItem);
router.delete('/:id', itemsController.deleteItem);

module.exports = router;
