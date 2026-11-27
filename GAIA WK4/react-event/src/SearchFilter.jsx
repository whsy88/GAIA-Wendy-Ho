import React, { useState } from 'react';

// Sample product dataset
const PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics' },
  { id: 2, name: 'Running Shoes', category: 'Clothing' },
  { id: 3, name: 'Coffee Maker', category: 'Appliances' },
  { id: 4, name: 'Smartphone Stand', category: 'Electronics' },
  { id: 5, name: 'Cotton T-Shirt', category: 'Clothing' },
  { id: 6, name: 'Electric Kettle', category: 'Appliances' }
];

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Appliances'];

export default function SearchFilterExercise() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);

  // 1. Filter products based on search input & category dropdown
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 2. Toggle favorite status
  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // 3. Keyboard shortcuts (Escape clears input, Enter adds first result to favorites)
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setSearchTerm('');
    } else if (e.key === 'Enter' && filteredProducts.length > 0) {
      e.preventDefault();
      const firstProduct = filteredProducts[0];
      if (!favorites.includes(firstProduct.id)) {
        toggleFavorite(firstProduct.id);
      }
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', textAlign: 'left' }}>
      <h3>Exercise 2: Real-time Search Filter</h3>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Search product... (Esc to clear, Enter to favorite top result)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ flex: 1, padding: '8px', boxSizing: 'border-box' }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '8px' }}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Product List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredProducts.map((product) => {
          const isFav = favorites.includes(product.id);
          return (
            <li
              key={product.id}
              onClick={() => toggleFavorite(product.id)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px',
                marginBottom: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor: isFav ? '#3a3a1a' : '#222'
              }}
            >
              <span>
                <strong>{product.name}</strong> ({product.category})
              </span>
              <span>{isFav ? '❤️ Favorite' : '🤍 Add to Favorites'}</span>
            </li>
          );
        })}
        {filteredProducts.length === 0 && (
          <li style={{ padding: '10px', color: '#888' }}>No products found.</li>
        )}
      </ul>
    </div>
  );
}