const ToDoRepository = require('../repository/ToDoRepository');
const ToDoDto = require('../dtos/ToDoDto');

class ToDoService {
  async addToDo(todoData) {
    const todo = await ToDoRepository.addToDo(todoData);
    return new ToDoDto(todo);
  }

  async getAllToDos() {
    const todos = await ToDoRepository.getAllToDos();
    return todos.map(todo => new ToDoDto(todo));
  }

  async getToDoById(id) {
    const todo = await ToDoRepository.getToDoById(id);
    if (!todo) throw new Error('ToDo not found');
    return new ToDoDto(todo);
  }

  async updateToDoById(id, updateData) {
    const todo = await ToDoRepository.updateToDoById(id, updateData);
    if (!todo) throw new Error('ToDo not found');
    return new ToDoDto(todo);
  }

  async deleteToDoById(id) {
    await ToDoRepository.deleteToDoById(id);
  }
}

module.exports = new ToDoService();
