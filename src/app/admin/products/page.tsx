'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data
  const products = [
    { id: 1, name: 'Assam Silk Saree', price: 1200, category: 'Women', stock: 15, image: '/Products/Assam Silk Saree.png' },
    { id: 2, name: 'Banarasi Silk Saree', price: 2500, category: 'Women', stock: 8, image: '/Products/Banarasi Silk Saree.png' },
    { id: 3, name: 'Checked Shirt', price: 899, category: 'Men', stock: 24, image: '/Products/Checked Shirt.png' },
    { id: 4, name: 'Kids Frock', price: 650, category: 'Kids', stock: 10, image: '/Products/Kids Frock.png' },
  ];

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-page">
      <div className="page-header">
        <h1 className="page-title">Products</h1>
        <button className="add-btn">
          <span className="material-symbols-outlined">add</span>
          Add Product
        </button>
      </div>

      <div className="toolbar">
        <div className="search-bar">
          <span className="material-symbols-outlined">search</span>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filters">
          <select className="filter-select">
            <option value="all">All Categories</option>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kids">Kids</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="product-thumb">
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      width={40} 
                      height={40} 
                      style={{ objectFit: 'cover', borderRadius: '4px' }}
                    />
                  </div>
                </td>
                <td className="fw-500">{product.name}</td>
                <td>{product.category}</td>
                <td>₹ {product.price}</td>
                <td>
                  <span className={`stock-badge ${product.stock < 10 ? 'low' : 'good'}`}>
                    {product.stock} in stock
                  </span>
                </td>
                <td>
                  <div className="actions">
                    <button className="icon-btn edit" title="Edit">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="icon-btn delete" title="Delete">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .page-title {
          font-family: var(--font-playfair);
          font-size: 1.8rem;
          color: #1a1a1a;
          margin: 0;
        }

        .add-btn {
          background-color: #d32f2f;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .add-btn:hover {
          background-color: #b71c1c;
        }

        .toolbar {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .search-bar {
          flex: 1;
          background: white;
          display: flex;
          align-items: center;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
        }

        .search-bar input {
          border: none;
          outline: none;
          width: 100%;
          margin-left: 0.5rem;
          font-size: 1rem;
        }

        .filter-select {
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
          background: white;
          font-size: 1rem;
          height: 100%;
        }

        .table-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
          overflow: hidden;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th, .data-table td {
          padding: 1rem 1.5rem;
          text-align: left;
          border-bottom: 1px solid #f0f0f0;
        }

        .data-table th {
          background-color: #f9fafb;
          color: #666;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .product-thumb {
          width: 40px;
          height: 40px;
          background: #f0f0f0;
          border-radius: 4px;
        }

        .fw-500 {
          font-weight: 500;
        }

        .stock-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

         .stock-badge.good { background: #ecfdf5; color: #047857; }
         .stock-badge.low { background: #fff7ed; color: #c2410c; }

        .actions {
          display: flex;
          gap: 0.5rem;
        }

        .icon-btn {
          width: 32px;
          height: 32px;
          border-radius: 4px;
          border: 1px solid #e0e0e0;
          background: white;
          color: #666;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .icon-btn:hover {
          background: #f5f5f5;
          color: #333;
        }
        
        .icon-btn.delete:hover {
          background: #fef2f2;
          border-color: #fee2e2;
          color: #dc2626;
        }
      `}</style>
    </div>
  );
}
