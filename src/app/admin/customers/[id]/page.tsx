'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCustomers } from '@/context/CustomerContext';

export default function CustomerProfile() {
  const params = useParams();
  const router = useRouter();
  const { customers } = useCustomers();
  
  // Find customer by ID from URL params
  const customer = customers.find(c => c.id === Number(params.id));

  if (!customer) {
    return (
      <div className="error-container">
        <h2>Customer Not Found</h2>
        <button onClick={() => router.back()}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => router.back()}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="page-title">Customer Profile</h1>
      </div>

      <div className="profile-grid">
        {/* Left Column: Info Card */}
        <div className="profile-card hero-card">
          <div className="avatar-large">{customer.name[0]}</div>
          <h2>{customer.name}</h2>
          <span className={`status-badge ${customer.status.toLowerCase()}`}>{customer.status}</span>
          
          <div className="info-list">
            <div className="info-item">
              <span className="icon material-symbols-outlined">email</span>
              <span>{customer.email}</span>
            </div>
            <div className="info-item">
              <span className="icon material-symbols-outlined">phone</span>
              <span>{customer.phone}</span>
            </div>
            <div className="info-item">
              <span className="icon material-symbols-outlined">location_on</span>
              <span>{customer.address}</span>
            </div>
            <div className="info-item">
              <span className="icon material-symbols-outlined">calendar_today</span>
              <span>Joined {customer.joinDate}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Stats & Activity */}
        <div className="content-col">
          {/* Stats Row */}
          <div className="stats-row">
            <div className="stat-card">
              <h3>Total Orders</h3>
              <p>{customer.orders}</p>
            </div>
            <div className="stat-card">
              <h3>Total Spent</h3>
              <p>₹ {customer.spent.toLocaleString()}</p>
            </div>
            <div className="stat-card">
              <h3>Average Order</h3>
              <p>₹ {customer.orders > 0 ? Math.round(customer.spent / customer.orders).toLocaleString() : 0}</p>
            </div>
          </div>

          {/* Segments */}
          <div className="segment-card">
            <h3>Segments</h3>
            <div className="tags">
              {customer.segments.map((seg, idx) => (
                <span key={idx} className="tag">{seg}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
        .page-title { font-family: var(--font-playfair); font-size: 1.8rem; color: #1a1a1a; margin: 0; }
        .back-btn { background: white; border: 1px solid #ddd; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
        .back-btn:hover { background: #f5f5f5; }

        .profile-grid { display: grid; grid-template-columns: 350px 1fr; gap: 2rem; }
        
        .profile-card { background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.02); display: flex; flex-direction: column; align-items: center; text-align: center; }
        
        .avatar-large { width: 100px; height: 100px; background: #e0e7ff; color: #3730a3; border-radius: 50%; font-size: 2.5rem; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; font-family: var(--font-playfair); font-weight: 600; }
        
        .status-badge { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 500; margin: 1rem 0; }
        .status-badge.active { background: #ecfdf5; color: #047857; }
        .status-badge.inactive { background: #fef2f2; color: #b91c1c; }

        .info-list { width: 100%; border-top: 1px solid #eee; margin-top: 1rem; padding-top: 1rem; text-align: left; }
        .info-item { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; color: #555; }
        .info-item .icon { color: #999; font-size: 1.2rem; }

        .content-col { display: flex; flex-direction: column; gap: 2rem; }
        .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .stat-card { background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
        .stat-card h3 { font-size: 0.9rem; color: #666; margin: 0 0 0.5rem 0; }
        .stat-card p { font-size: 1.5rem; font-weight: 600; color: #1a1a1a; margin: 0; }

        .segment-card { background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
        .segment-card h3 { margin-top: 0; margin-bottom: 1rem; font-size: 1.1rem; }
        .tags { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .tag { background: #f3f4f6; color: #1a1a1a; padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.9rem; }
      `}</style>
    </div>
  );
}
