// ToDo.Frontend/src/App.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  // State for editing todo
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoData, setEditTodoData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/ToDo/GetAllToDo");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    if (newTodo.title) {
      try {
        await axios.post("/api/ToDo/AddToDo", newTodo);
        setNewTodo({ title: "", description: "" });
        fetchTodos();
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/ToDo/DeleteToDoById/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const editTodo = (todo) => {
    setEditTodoId(todo.id);
    setEditTodoData({ title: todo.title, description: todo.description });
  };

  const saveEditTodo = async (id) => {
    try {
      await axios.put(`/api/ToDo/UpdateToDoById/${id}`, editTodoData);
      setEditTodoId(null);
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="App">
      <div className="container-sm justify-content-center bg-light p-5">
        <h1 className="header text-center bg-secondary p-2">TO DO</h1>

        <div className="text-center">
          <div className="form-group my-3">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={newTodo.title}
              required
              onChange={(e) =>
                setNewTodo({ ...newTodo, title: e.target.value })
              }
            />
          </div>
          <div className="form-group my-3">
            <textarea
              className="form-control"
              placeholder="Description"
              value={newTodo.description}
              required
              onChange={(e) =>
                setNewTodo({ ...newTodo, description: e.target.value })
              }
            />
          </div>
          <button className="btn btn-info" onClick={addTodo}>
            Add To Do
          </button>
        </div>

        <h2 className="mt-4">Todos</h2>
        {todos.length === 0 ? (
          <div className="card text-center p-3 mt-3">
            <h5>No todos available</h5>
          </div>
        ) : (
          <div className="row">
            {todos.map((todo) => (
              <div className="col-lg-3 col-md-6 col-sm-12 mb-4" key={todo.id}>
                <div className="card p-3 mb-3 h-100">
                  {editTodoId === todo.id ? (
                    <>
                      <input
                        type="text"
                        value={editTodoData.title}
                        onChange={(e) =>
                          setEditTodoData({
                            ...editTodoData,
                            title: e.target.value,
                          })
                        }
                        className="form-control"
                      />
                      <textarea
                        value={editTodoData.description}
                        onChange={(e) =>
                          setEditTodoData({
                            ...editTodoData,
                            description: e.target.value,
                          })
                        }
                        className="form-control mt-2"
                      />
                      <select
                        value={editTodoData.completed}
                        onChange={(e) =>
                          setEditTodoData({
                            ...editTodoData,
                            completed: e.target.value === "true",
                          })
                        }
                        className="form-control mt-2"
                      >
                        <option value={false}>Not Completed</option>
                        <option value={true}>Completed</option>
                      </select>
                      <div className="d-flex justify-content-between mt-2">
                        <button
                          onClick={() => saveEditTodo(todo.id)}
                          className="btn btn-sm btn-success me-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditTodoId(null)}
                          className="btn btn-sm btn-secondary"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="card-title">{todo.title}</h3>
                      <p>
                        <strong>ID:</strong> {todo.todoId}
                      </p>
                      <p>{todo.description}</p>
                      <p>
                        <strong>Status:</strong>{" "}
                        {todo.completed ? "Completed" : "Not Completed"}
                      </p>
                      <div className="d-flex justify-content-between mt-2">
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => editTodo(todo)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteTodo(todo.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
