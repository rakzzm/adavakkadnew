import ProductList from '@/components/ProductList';

export default function Products() {
  return (
    <section id="products" style={{ marginTop: '80px' }}>
      <div className="container">
        <ProductList />
      </div>
    </section>
  );
}
