import JSXExamples from './components/JSXExample'
import UserCard from './components/UserCard'
import LayoutComponents from './components/LayoutComponents'

//   const users = [
//     {
//       id: 1,
//       name: "John Doe",
//       email: "john@example.com",
//       role: "Developer"
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       email: "jane@example.com",
//       role: "UI/UX Designer"
//     },
//     {
//       id: 3,
//       name: "Alex Johnson",
//       email: "alex@example.com",
//       role: "Project Manager"
//     }
//   ];

//   function App () {
//   return (
//     <div>
//       {users.map((user) => (
//         <UserCard
//           key={user.id}
//           name={user.name}
//           email={user.email}
//           role={user.role}
//         />
//       ))}
//     </div>
//   );
// }

// export default App;

import ProductList from './components/ProductList';

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    isOnSale: true
  },
  {
    id: 2,
    name: "Minimalist Watch",
    price: 149.50,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    isOnSale: false
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    price: 120.00,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
    isOnSale: true
  }
];

export default function App() {
  return (
    <div className="app-container">
      <h1>Our Products</h1>
      <div className="product-grid">
        {products.map((item) => (
          <ProductList
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
            isOnSale={item.isOnSale}
          />
        ))}
      </div>
    </div>
  );
}