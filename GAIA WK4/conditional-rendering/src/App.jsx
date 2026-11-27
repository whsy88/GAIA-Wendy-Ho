// import React from 'react';

// export default function App() {
//   const items = [
//     { id: 'item-1', name: 'Apple' },
//     { id: 'item-2', name: 'Banana' },
//     { id: 'item-3', name: 'Cherry' }
//   ];

//   return (
//     <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
//       <h1>Understanding Keys in React</h1>

//       <section style={{ marginBottom: '20px' }}>
//         <h3>❌ Bad - Using array index as key</h3>
//         <ul>
//           {items.map((item, index) => (
//             <li key={index}>{item.name}</li>
//           ))}
//         </ul>
//       </section>

//       <section style={{ marginBottom: '20px' }}>
//         <h3>✅ Good - Using unique, stable identifier</h3>
//         <ul>
//           {items.map(item => (
//             <li key={item.id}>{item.name}</li>
//           ))}
//         </ul>
//       </section>

//       <section>
//         <h3>✅ Good - Creating unique key when no ID exists</h3>
//         <ul>
//           {items.map((item, index) => (
//             <li key={`${item.name}-${index}`}>{item.name}</li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// }

// import Dashboard from "./components/Dashboard";

// function App() {
//   return (
//     <div>
//       <Dashboard />
//     </div>
//   );
// }

// export default App;

// import ProductCatalog from './components/ProductCatalog';

// function App() {
//   return (
//     <div>
//       <ProductCatalog />
//     </div>
//   );
// }

// export default App;

// import CommentsSystem from './components/CommentsSystem';

// function App() {
//   return (
//     <div>
//       <CommentsSystem />
//     </div>
//   );
// }

// export default App;

// import WeatherDashboard from './components/WeatherDashboard';

// function App() {
//   return (
//     <div>
//       <WeatherDashboard />
//     </div>
//   );
// }

// export default App;

import TaskManager from './components/TaskManager';

function App() {
  return (
    <div>
      <TaskManager />
    </div>
  );
}

export default App;