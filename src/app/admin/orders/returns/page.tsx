'use client';

import { useState, useEffect } from 'react';

export default function AdminReturns() {
  const [returns, setReturns] = useState([
    { id: 'RET-001', orderId: '#ORD-7821', customer: 'Rahul Krishna', reason: 'Size too small', status: 'Pending', date: 'Jan 13, 2026' },
    { id: 'RET-002', orderId: '#ORD-7815', customer: 'Priya S.', reason: 'Defective Item', status: 'Approved', date: 'Jan 10, 2026' },
  ]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReturn, setEditingReturn] = useState<typeof returns[0] | null>(null);
  const [newStatus, setNewStatus] = useState('');

  // Load from Local Storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('advakkad_returns');
      if (saved) {
        try {
          setReturns(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse returns", e);
        }
      }
    }
  }, []);

  // Save to Local Storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('advakkad_returns', JSON.stringify(returns));
    }
  }, [returns]);

  const handleManage = (ret: typeof returns[0]) => {
    setEditingReturn(ret);
    setNewStatus(ret.status);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingReturn) {
      const updatedReturns = returns.map(ret => 
        ret.id === editingReturn.id ? { ...ret, status: newStatus } : ret
      );
      setReturns(updatedReturns);
      setIsModalOpen(false);
      setEditingReturn(null);
    }
  };

  return (
    <div className="returns-page">
      <div className="page-header">
        <h1 className="page-title">Returns</h1>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Return ID</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Reason</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {returns.map(ret => (
              <tr key={ret.id}>
                <td className="fw-600">{ret.id}</td>
                <td className="fw-600">{ret.orderId}</td>
                <td>{ret.customer}</td>
                <td>{ret.reason}</td>
                <td>{ret.date}</td>
                <td>
                  <span className={`status-badge ${ret.status.toLowerCase()}`}>
                    {ret.status}
                  </span>
                </td>
                <td>
                  <button className="action-btn" onClick={() => handleManage(ret)}>Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Manage Return Modal */}
      {isModalOpen && editingReturn && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Manage Return {editingReturn.id}</h2>
            
            <div className="modal-details">
              <p><strong>Order ID:</strong> {editingReturn.orderId}</p>
              <p><strong>Customer:</strong> {editingReturn.customer}</p>
              <p><strong>Reason:</strong> {editingReturn.reason}</p>
            </div>

            <div className="form-group">
              <label htmlFor="status-select">Update Status</label>
              <select 
                id="status-select"
                value={newStatus} 
                onChange={(e) => setNewStatus(e.target.value)}
                className="status-select"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="btn-save" onClick={handleSave}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .page-header { margin-bottom: 2rem; }
        .page-title { font-family: var(--font-playfair); font-size: 1.8rem; color: #1a1a1a; margin: 0; }
        .table-container { background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); overflow: hidden; }
        .data-table { width: 100%; border-collapse: collapse; }
        .data-table th, .data-table td { padding: 1rem 1.5rem; text-align: left; border-bottom: 1px solid #f0f0f0; }
        .data-table th { background: #f9fafb; color: #666; font-weight: 600; font-size: 0.9rem; }
        .fw-600 { font-weight: 600; }
        .status-badge { padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 500; }
        .status-badge.pending { background: #fff7ed; color: #c2410c; }
        .status-badge.approved { background: #ecfdf5; color: #047857; }
        .status-badge.rejected { background: #fef2f2; color: #b91c1c; }
        .status-badge.refunded { background: #eff6ff; color: #1d4ed8; }
        
        .action-btn { background: none; border: none; color: #d32f2f; cursor: pointer; font-weight: 500; }
        .action-btn:hover { text-decoration: underline; }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        .modal-content h2 {
          margin-top: 0;
          margin-bottom: 1.5rem;
          font-family: var(--font-playfair);
          color: #1a1a1a;
        }

        .modal-details {
          background: #f9fafb;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }

        .modal-details p {
          margin: 0.5rem 0;
          color: #555;
        }

        .form-group {
          margin-bottom: 2rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #333;
        }

        .status-select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
        }

        .btn-cancel {
          background: #f5f5f5;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          color: #666;
          font-weight: 600;
        }

        .btn-save {
          background: #d32f2f;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          color: white;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
