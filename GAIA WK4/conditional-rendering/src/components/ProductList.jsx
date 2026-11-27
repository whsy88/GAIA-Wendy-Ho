// Basic list rendering 
function ProductionList({ products }) {
    return ( 
        <ul>
            {products.map(product => (
                <li key={product.id}>
                    {product.name} - ${product.price}
                </li>
            ))}
        </ul>
    );
}

// Complex list with conditional elements
function EnhancedProductList({ products, userRole }) {
    return (
        <div>
            {products.map(product => (
                <div key={product.id} className="product-card">
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                    {product.onSale && <span className="sale-badge">ON SALE!</span>}
                    {userRole === 'admin' && (
                        <button>Edit Product</button>
            )}
        </div>
    ))}
    </div>
    );
}