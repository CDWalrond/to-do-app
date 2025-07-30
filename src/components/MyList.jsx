import React, { useState, useEffect } from "react";
import ChecklistItem from "../components/CheckListItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";

const fetchTodos = async (setTodos) => {
  try {
    const response = await fetch("https://to-do-back-end.onrender.com/todos");
    const data = await response.json();
    console.log("Fetched todos:", data);
    setTodos(data.todos);
    console.log(data.todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};
const MainContent = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTask, setEditingTask] = useState("");
  useEffect(() => {
    fetchTodos(setTodos);
  }, []);
  // Handle input change for new todo
  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  // Add a new todo to the state
  const handleAddTodo = async () => {
    console.log("Adding new todo:", newTodo);
    if (!newTodo.trim()) return; // Prevent adding empty todos
    try {
      const response = await fetch(
        "https://to-do-back-end.onrender.com/add-item",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: newTodo }), // Only send text, no _id or completed
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        console.log("New todo added:", data);
        setTodos([...todos, newTodo]); // Update state with new todo from the backend
        setNewTodo("");
      } // Reset input
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Edit an existing todo
  const handleEditTodo = (todo) => {
    setEditingTodoId(todo._id);
    setEditingTask(todo.text);
  };

  // Save the edited todo
  const handleSaveEdit = async (id) => {
    try {
      const response = await fetch(
        `https://to-do-back-end.onrender.com/edit-item/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: editingTask }),
        }
      );
      const updatedTodo = await response.json();
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
      setEditingTodoId(null); // Exit edit mode
      setEditingTask(""); // Clear input
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  // Cancel the edit
  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditingTask("");
  };

  // Toggle complete status
  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const handleDelete = async (id) => {
    try {
      await fetch(`https://to-do-back-end.onrender.com/delete-item/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo._id !== id)); // Remove from local state
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Map todos to ChecklistItem components
  const mappedTodos = todos.map((todo) => {
    console.log("Mapping todo:", todo);
    return (
      <ChecklistItem
        key={todo._id}
        todo={todo}
        editingTodoId={editingTodoId}
        editingTask={editingTask}
        handleEditTodo={handleEditTodo}
        handleSaveEdit={handleSaveEdit}
        handleCancelEdit={handleCancelEdit}
        handleToggleComplete={handleToggleComplete}
        handleDelete={handleDelete}
        setEditingTask={setEditingTask}
      />
    );
  });

  return (
    <div>
      <h1>To-Do List</h1>
      <TextField
        value={newTodo}
        onChange={handleInputChange}
        placeholder="Enter a new text"
        variant="outlined"
        fullWidth
      />
      <Button
        onClick={() => handleAddTodo()}
        variant="contained"
        sx={{ mt: 2 }}
      >
        Add Task
      </Button>
      <List>{mappedTodos}</List>
    </div>
  );
};

export default MainContent;
