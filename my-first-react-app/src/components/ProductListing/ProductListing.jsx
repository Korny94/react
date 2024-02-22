function ProductCard({ index, title, description, price, onAddToCartClick }) {
  return (
    <div>
      <h2>Product Card Component with Test</h2>
      <h2>{title}</h2>
      <p>{description}</p>
      <div>${price}</div>
      <button onClick={() => onAddToCartClick(index)}>Add to cart</button>
    </div>
  );
}

export default ProductCard;
