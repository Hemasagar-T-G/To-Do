const ToDoModel = require('../models/ToDoModel');

class ToDoRepository {
  async addToDo(todoData) {
    return await ToDoModel.create(todoData);
  }

  async getAllToDos() {
    return await ToDoModel.find({});
  }

  async getToDoById(id) {
    return await ToDoModel.findById(id);
  }

  async updateToDoById(id, updateData) {
    return await ToDoModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteToDoById(id) {
    return await ToDoModel.findByIdAndDelete(id);
  }
}

module.exports = new ToDoRepository();
