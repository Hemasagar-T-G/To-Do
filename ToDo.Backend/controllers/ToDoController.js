const ToDoService = require('../services/ToDoService');

class ToDoController {
  async addToDo(req, res) {
    try {
      const todo = await ToDoService.addToDo(req.body);
      res.status(201).json(todo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllToDos(req, res) {
    try {
      const todos = await ToDoService.getAllToDos();
      res.status(200).json(todos);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getToDoById(req, res) {
    try {
      const todo = await ToDoService.getToDoById(req.params.id);
      res.status(200).json(todo);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async updateToDoById(req, res) {
    try {
      const todo = await ToDoService.updateToDoById(req.params.id, req.body);
      res.status(200).json(todo);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async deleteToDoById(req, res) {
    try {
      await ToDoService.deleteToDoById(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

module.exports = new ToDoController();