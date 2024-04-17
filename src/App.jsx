import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setTodos([...todos, { id: Date.now(), text: inputValue }]);
    setInputValue("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container mx-auto my-12">
      <h1 className="text-3xl font-bold text-center mb-8">Todo</h1>
      <form className="flex space-x-4 mb-8" onSubmit={handleSubmit}>
        <input
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Add your wishlist here..."
          value={inputValue}
          onChange={handleChange}
        />
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="submit"
        >
          Add
        </button>
      </form>
      <div className="space-y-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="bg-white shadow-md rounded-md px-4 py-3 flex items-center justify-between"
          >
            <div className="flex items-center">
              <input
                id={`item-${todo.id}`}
                className="mr-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                type="checkbox"
              />
              <label
                htmlFor={`item-${todo.id}`}
                className="text-gray-800 hover:text-gray-600 cursor-pointer"
              >
                {todo.text}
              </label>
            </div>
            <button
              className="text-red-500 hover:text-red-600 focus:outline-none"
              onClick={() => handleDelete(todo.id)}
            >
              <span className="material-icons-outlined">delete</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
