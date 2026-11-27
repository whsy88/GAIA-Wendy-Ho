import { useState, useMemo } from 'react';

export default function TaskManager() {
  // Initial tasks data
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Submit Project Report',
      priority: 'High',
      category: 'Work',
      completed: false,
      dueDate: '2024-01-01', // Overdue date example
      selected: false
    },
    {
      id: 2,
      title: 'Buy Groceries',
      priority: 'Low',
      category: 'Personal',
      completed: true,
      dueDate: '2026-12-31',
      selected: false
    },
    {
      id: 3,
      title: 'Schedule Team Sync',
      priority: 'Medium',
      category: 'Work',
      completed: false,
      dueDate: '2026-10-10',
      selected: false
    }
  ]);

  // Form input state
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newCategory, setNewCategory] = useState('Work');
  const [newDueDate, setNewDueDate] = useState('');

  // Filter states
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Check if task is overdue
  const isOverdue = (dueDate, completed) => {
    if (!dueDate || completed) return false;
    const today = new Date().toISOString().split('T')[0];
    return dueDate < today;
  };

  // Add new task handler
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTitle,
      priority: newPriority,
      category: newCategory,
      completed: false,
      dueDate: newDueDate,
      selected: false
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTitle('');
    setNewDueDate('');
  };

  // Toggle complete
  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Toggle select single item
  const toggleSelect = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, selected: !task.selected } : task
      )
    );
  };

  // Filter tasks dynamically
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Completed' && task.completed) ||
        (statusFilter === 'Pending' && !task.completed);

      const matchesPriority =
        priorityFilter === 'All' || task.priority === priorityFilter;

      const matchesCategory =
        categoryFilter === 'All' || task.category === categoryFilter;

      return matchesStatus && matchesPriority && matchesCategory;
    });
  }, [tasks, statusFilter, priorityFilter, categoryFilter]);

  // Bulk Actions
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    const filteredIds = new Set(filteredTasks.map((t) => t.id));
    setTasks((prev) =>
      prev.map((task) =>
        filteredIds.has(task.id) ? { ...task, selected: isChecked } : task
      )
    );
  };

  const handleDeleteSelected = () => {
    setTasks((prev) => prev.filter((task) => !task.selected));
  };

  const selectedCount = tasks.filter((t) => t.selected).length;

  return (
    <div style={{ maxWidth: '700px', margin: '30px auto', fontFamily: 'sans-serif', padding: '20px', border: '1px solid #ddd', borderRadius: '12px' }}>
      <h2>📋 Task Manager</h2>

      {/* 1. Add Task Form */}
      <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Task title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          required
          style={{ flex: '2', padding: '8px' }}
        />
        <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)} style={{ padding: '8px' }}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} style={{ padding: '8px' }}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
        </select>
        <input
          type="date"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
          style={{ padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>Add Task</button>
      </form>

      {/* 2. Dynamic Filters */}
      <div style={{ display: 'flex', gap: '15px', background: '#f5f5f5', padding: '12px', borderRadius: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div>
          <label>Status: </label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label>Priority: </label>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label>Category: </label>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
      </div>

      {/* 3. Bulk Actions Toolbar */}
      {filteredTasks.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <label style={{ cursor: 'pointer' }}>
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={filteredTasks.length > 0 && filteredTasks.every((t) => t.selected)}
            />
            Select All Filtered
          </label>

          {selectedCount > 0 && (
            <button
              onClick={handleDeleteSelected}
              style={{ backgroundColor: '#ff4d4f', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Delete Selected ({selectedCount})
            </button>
          )}
        </div>
      )}

      {/* 4. Task List or Empty State */}
      {filteredTasks.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredTasks.map((task) => {
            const overdue = isOverdue(task.dueDate, task.completed);

            return (
              <li
                key={task.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  padding: '12px',
                  marginBottom: '8px',
                  border: '1px solid #eee',
                  borderRadius: '6px',
                  backgroundColor: overdue ? '#fff2f0' : task.completed ? '#f6ffed' : '#fff'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    checked={task.selected}
                    onChange={() => toggleSelect(task.id)}
                  />
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                  />
                  <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                    {task.title}
                  </span>
                  
                  {/* Category & Priority Tags */}
                  <span style={{ fontSize: '0.8rem', background: '#e6f7ff', padding: '2px 6px', borderRadius: '4px' }}>
                    {task.category}
                  </span>
                  <span style={{ fontSize: '0.8rem', background: '#fff7e6', padding: '2px 6px', borderRadius: '4px' }}>
                    {task.priority}
                  </span>

                  {/* Conditional Rendering for Overdue Banner */}
                  {overdue && (
                    <span style={{ fontSize: '0.8rem', color: '#ff4d4f', fontWeight: 'bold' }}>
                      ⚠️ OVERDUE
                    </span>
                  )}
                </div>

                {task.dueDate && <span style={{ fontSize: '0.85rem', color: '#888' }}>{task.dueDate}</span>}
              </li>
            );
          })}
        </ul>
      ) : (
        /* 5. Empty States for Filter Combinations */
        <div style={{ textAlign: 'center', padding: '30px', background: '#fafafa', borderRadius: '8px', color: '#666' }}>
          <h3>No tasks found</h3>
          <p>No tasks match the selected filter combination (Status: {statusFilter}, Priority: {priorityFilter}, Category: {categoryFilter}).</p>
        </div>
      )}
    </div>
  );
}