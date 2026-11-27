export default function ProductList({
  id,
  name = "Unknown Product",
  price = 0,
  image = "placeholder.jpg",
  isOnSale = false,
}) {
  return (
    <div className="product-card">
      {isOnSale && <span className="sale-badge">SALE</span>}
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>${price.toFixed(2)}</p>
      <button onClick={() => alert(`Added ${name} (ID: ${id}) to cart!`)}>
        Add to Cart
      </button>
    </div>
  );
}