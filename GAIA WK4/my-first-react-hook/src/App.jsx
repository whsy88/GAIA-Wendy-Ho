import Counter from './components/Counter';
import UserProfile from './components/UserProfile';
import UserForm from './components/UserForm';
import TodoList from './components/TodoList';
import TemperatureConverter from './components/TemperatureConverter';
import ShoppingCart from './components/ShoppingCart';
import ExpenseTracker from './components/ExpenseTracker';

export default function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', textAlign: 'left' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>
        State Management with useState Hook
      </h1>
      <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #ddd' }} />

      <Counter />
      <UserProfile />
      <UserForm />
      <TodoList />
      <TemperatureConverter />
      <ShoppingCart />
      <ExpenseTracker />
    </div>
  );
}