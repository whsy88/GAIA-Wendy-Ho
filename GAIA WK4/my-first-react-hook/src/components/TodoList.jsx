import { useState } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: Date.now(), text: inputValue, completed: false }
      ]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={cardStyle}>
      <h2>Example 4: Array State Management (Todo List)</h2>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: '6px' }}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                marginRight: '12px'
              }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const cardStyle = {
  padding: '16px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  marginBottom: '20px',
  backgroundColor: '#fafafa'
};
