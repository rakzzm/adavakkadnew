'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function UserAccount() {
  const { user, logout } = useAuth();

  // Mock Orders
  const orders = [
    { id: '#ORD-1001', date: 'Jan 10, 2026', total: '₹ 2,499', status: 'Delivered', items: ['Assam Silk Saree'] },
    { id: '#ORD-0982', date: 'Dec 25, 2025', total: '₹ 899', status: 'Delivered', items: ['Kids Frock'] },
  ];

  if (!user) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Please Sign In</h2>
        <p>You need to be logged in to view this page.</p>
        <Link href="/login" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Sign In</Link>
      </div>
    );
  }

  return (
    <div className="account-page">
      <div className="container">
        <div className="account-header">
          <div>
            <h1 className="page-title">My Account</h1>
            <p className="welcome-text">Welcome back, {user.name}!</p>
          </div>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>

        <div className="account-grid">
          {/* Profile Card */}
          <div className="card profile-card">
            <h3>Profile Information</h3>
            <div className="profile-details">
              <div className="detail-row">
                <span className="label">Name:</span>
                <span className="value">{user.name}</span>
              </div>
              <div className="detail-row">
                <span className="label">Email:</span>
                <span className="value">{user.email}</span>
              </div>
              <div className="detail-row">
                <span className="label">Role:</span>
                <span className="value" style={{ textTransform: 'capitalize' }}>{user.role}</span>
              </div>
            </div>
            <button className="edit-btn">Edit Profile</button>
          </div>

          {/* Orders Card */}
          <div className="card orders-card">
            <h3>Recent Orders</h3>
            {orders.length > 0 ? (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order.id} className="order-item">
                    <div className="order-header">
                      <span className="order-id">{order.id}</span>
                      <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
                    </div>
                    <div className="order-details">
                      <span>{order.date}</span>
                      <span>{order.total}</span>
                    </div>
                    <div className="order-items">
                      {order.items.join(', ')}
                    </div>
                    <button className="view-order-btn">View Details</button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .account-page {
          padding: 3rem 0;
          background-color: #f9f9f9;
          min-height: 80vh;
        }

        .account-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .page-title {
          font-family: var(--font-playfair);
          font-size: 2rem;
          color: #1a1a1a;
          margin: 0;
        }

        .welcome-text {
          color: #666;
          margin: 0.5rem 0 0;
        }

        .logout-btn {
          background: #333;
          color: white;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }

        .logout-btn:hover {
          background: #000;
        }

        .account-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .account-grid {
            grid-template-columns: 1fr;
          }
        }

        .card {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
        }

        .card h3 {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          color: #1a1a1a;
          border-bottom: 1px solid #eee;
          padding-bottom: 0.5rem;
        }

        .profile-details {
          margin-bottom: 1.5rem;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f5f5f5;
        }

        .label { color: #666; }
        .value { font-weight: 500; color: #333; }

        .edit-btn {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .edit-btn:hover {
          border-color: #333;
          background: #f9f9f9;
        }

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .order-item {
          border: 1px solid #eee;
          padding: 1rem;
          border-radius: 8px;
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .order-id { font-weight: 600; color: #333; }
        
        .status {
          font-size: 0.8rem;
          padding: 0.1rem 0.5rem;
          border-radius: 4px;
        }
        .status.delivered { background: #ecfdf5; color: #047857; }

        .order-details {
          display: flex;
          justify-content: space-between;
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .order-items {
          font-size: 0.9rem;
          color: #444;
          margin-bottom: 1rem;
        }

        .view-order-btn {
          background: none;
          border: none;
          color: #d32f2f;
          padding: 0;
          font-weight: 500;
          cursor: pointer;
          font-size: 0.9rem;
        }
        
        .view-order-btn:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
