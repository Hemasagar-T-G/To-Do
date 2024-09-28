const express = require('express');
const ToDoController = require('../controllers/ToDoController');

const router = express.Router();

router.post('/api/ToDo/AddToDo', ToDoController.addToDo);
router.get('/api/ToDo/GetAllToDo', ToDoController.getAllToDos);
router.get('/api/ToDo/GetToDoById/:id', ToDoController.getToDoById);
router.put('/api/ToDo/UpdateToDoById/:id', ToDoController.updateToDoById);
router.delete('/api/ToDo/DeleteToDoById/:id', ToDoController.deleteToDoById);

module.exports = router;
