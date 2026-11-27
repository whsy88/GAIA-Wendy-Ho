import { useState } from 'react';

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [filterCategory, setFilterCategory] = useState('All');

  const addExpense = (e) => {
    e.preventDefault();
    if (!description.trim() || !amount) return;

    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        category
      }
    ]);

    setDescription('');
    setAmount('');
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const filteredExpenses =
    filterCategory === 'All'
      ? expenses
      : expenses.filter((exp) => exp.category === filterCategory);

  const total = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div style={cardStyle}>
      <h2>Exercise 3: Personal Expense Tracker</h2>
      
      <form onSubmit={addExpense} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>

      <div style={{ marginBottom: '12px' }}>
        <label>Filter by Category: </label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </div>

      <ul>
        {filteredExpenses.map((exp) => (
          <li key={exp.id} style={{ marginBottom: '6px' }}>
            [{exp.category}] {exp.description}: ${exp.amount.toFixed(2)}{' '}
            <button onClick={() => deleteExpense(exp.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Total Expenses: ${total.toFixed(2)}</h3>
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