const express = require('express');
const todoController = require('../controller/todoController');

const router = express.Router();

router.get('/api/tasks', todoController.getAll);
router.get('/api/task/:id', todoController.getById);
router.post('/api/task', todoController.create);
router.put('/api/task/:id', todoController.updateById);
router.delete('/api/task/:id', todoController.deleteById);

module.exports = router;
