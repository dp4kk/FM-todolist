import  { useState, useEffect } from 'react';

const MyComponent = () => {
  const [todoList, setTodoList] = useState([]);
  const [todoItem, setTodoItem] = useState('');

  const handleAddTodo = (e) => {
    if (e.key === 'Enter') {
      const newTodo = {
        id: Date.now(),
        todo: todoItem,
        completed: false,
      };

      // Update state
      setTodoList((prev) => [...prev, newTodo]);

      // Save to local storage
      localStorage.setItem('todoList', JSON.stringify([...todoList, newTodo]));

      // Clear input
      setTodoItem('');
    }
  };

  useEffect(() => {
    // Retrieve from local storage on mount
    const storedTodoList = localStorage.getItem('todoList');
    if (storedTodoList) {
      setTodoList(JSON.parse(storedTodoList));
    }
  }, []);

  // Function to handle deletion of a todo item
  const handleDeleteTodo = (id) => {
    // Modify todoList to remove the item with the specified id
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);

    // Update state
    setTodoList(updatedTodoList);

    // Save updated todoList to local storage
    localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
  };

  return (
    <div>
      <input
        type="text"
        value={todoItem}
        onChange={(e) => setTodoItem(e.target.value)}
        onKeyDown={handleAddTodo}
      />

      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            {todo.todo}{' '}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;

const handleToggleCompletion = (id) => {
  // Find the index of the todo item with the given id
  const index = todoList.findIndex(item => item.id === id);

  // Create a copy of the todoList array to avoid mutating state directly
  const updatedTodoList = [...todoList];

  // Toggle the 'completed' property of the corresponding todo item
  updatedTodoList[index].completed = !updatedTodoList[index].completed;

  // Update the state with the modified todoList
  setTodoList(updatedTodoList);

  // Update local storage if needed
  localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
};