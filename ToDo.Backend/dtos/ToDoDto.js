class ToDoDto {
  constructor({ _id, todoId, title, description, completed, createdAt }) {
    this.id = _id; // MongoDB objectId
    this.todoId = todoId;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.createdAt = createdAt;
  }
}

module.exports = ToDoDto;
