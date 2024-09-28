const mongoose = require('mongoose');

// Helper function for generating ToDoId
const GenerateToDoId = (title, description, createdAt) => {
  // First 4 letters from the title (use substring to ensure it's only 4 characters)
  const titlePart = title.substring(0, 4).toUpperCase();

  // Extract digits from the description, and add letters if not enough digits
  let digits = description.replace(/\D/g, '');
  let letters = description.replace(/[^a-zA-Z]/g, '');

  // Combine digits and letters to form a 4-character string
  let combined = (digits + letters).substring(0, 4).padEnd(4, '0').toUpperCase();;
  const day = String(createdAt.getDate()).padStart(2, '0');
  const month = String(createdAt.getMonth() + 1).padStart(2, '0');
  const datePart = `${day}${month}`;
  const randomPart = Math.floor(Math.random() * 9000) + 1001;
  return `TODO-${titlePart}-${combined}-${datePart}-${randomPart}`;
};


const ToDoSchema = new mongoose.Schema({
  todoId: { type: String }, // Allow todoId to be generated, do not make it required
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Pre-save hook to generate todoId
ToDoSchema.pre('save', function (next) {
  if (!this.todoId) { // Only generate if todoId doesn't exist
    this.todoId = GenerateToDoId(this.title, this.description, this.createdAt);
  }
  next();
});

module.exports = mongoose.model('ToDo', ToDoSchema);
