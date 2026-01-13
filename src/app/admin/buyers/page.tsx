'use client';

import { useState } from 'react';
import { useBuyers, Buyer } from '@/context/BuyerContext';

export default function AdminBuyers() {
  const { buyers, addBuyer, updateBuyer, deleteBuyer } = useBuyers();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedBuyer, setSelectedBuyer] = useState<Buyer | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    location: '', 
    totalOrders: 0,
    totalSpent: 0,
    lastActive: 'Just now'
  });

  const filteredBuyers = buyers.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ name: '', location: '', totalOrders: 0, totalSpent: 0, lastActive: 'Just now' });
    setIsFormModalOpen(true);
  };

  const handleEdit = (buyer: Buyer) => {
    setEditingId(buyer.id);
    setFormData({
      name: buyer.name,
      location: buyer.location,
      totalOrders: buyer.totalOrders,
      totalSpent: buyer.totalSpent,
      lastActive: buyer.lastActive
    });
    setIsFormModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if(confirm('Delete this buyer?')) {
      deleteBuyer(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateBuyer(editingId, formData);
    } else {
      addBuyer(formData);
    }
    setIsFormModalOpen(false);
  };

  const viewHistory = (buyer: Buyer) => {
    setSelectedBuyer(buyer);
    setIsHistoryModalOpen(true);
  };

  return (
    <div className="buyers-page">
      <div className="page-header">
        <h1 className="page-title">Buyer List</h1>
        <div className="header-actions">
           <button className="add-btn" onClick={handleAddNew}>
             <span className="material-symbols-outlined">add</span> Add Buyer
           </button>
           <button className="export-btn">
             <span className="material-symbols-outlined">download</span> Export CSV
           </button>
        </div>
      </div>

      <div className="table-container">
        <div className="toolbar">
           <div className="search-bar">
             <span className="material-symbols-outlined">search</span>
             <input type="text" placeholder="Search buyers..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
           </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Buyer Name</th>
              <th>Location</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Last Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBuyers.map(buyer => (
              <tr key={buyer.id}>
                <td className="fw-600">{buyer.name}</td>
                <td>{buyer.location}</td>
                <td>{buyer.totalOrders}</td>
                <td className="fw-600">₹ {buyer.totalSpent.toLocaleString()}</td>
                <td>{buyer.lastActive}</td>
                <td>
                  <div className="action-row">
                    <button className="link-btn" onClick={() => viewHistory(buyer)}>History</button>
                    <button className="icon-btn edit" onClick={() => handleEdit(buyer)} title="Edit"><span className="material-symbols-outlined">edit</span></button>
                    <button className="icon-btn delete" onClick={() => handleDelete(buyer.id)} title="Delete"><span className="material-symbols-outlined">delete</span></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isFormModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingId ? 'Edit Buyer' : 'Add New Buyer'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
              </div>
              <div className="form-row">
                 <div className="form-group">
                  <label>Total Orders</label>
                  <input type="number" value={formData.totalOrders} onChange={e => setFormData({...formData, totalOrders: Number(e.target.value)})} />
                </div>
                <div className="form-group">
                  <label>Total Spent (₹)</label>
                  <input type="number" value={formData.totalSpent} onChange={e => setFormData({...formData, totalSpent: Number(e.target.value)})} />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsFormModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-save">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* History Modal */}
      {isHistoryModalOpen && selectedBuyer && (
        <div className="modal-overlay">
          <div className="modal-content history-modal">
             <div className="modal-header">
               <h2>History: {selectedBuyer.name}</h2>
               <button onClick={() => setIsHistoryModalOpen(false)} className="close-btn"><span className="material-symbols-outlined">close</span></button>
             </div>
             <div className="history-list">
               {selectedBuyer.history.length === 0 ? <p>No history available.</p> : (
                 <ul>
                   {selectedBuyer.history.map((log, i) => (
                     <li key={i}>{log}</li>
                   ))}
                 </ul>
               )}
             </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .page-title { font-family: var(--font-playfair); font-size: 1.8rem; color: #1a1a1a; margin: 0; }
        
        .header-actions { display: flex; gap: 1rem; }
        .add-btn { background: #d32f2f; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 6px; display: flex; align-items: center; gap: 0.5rem; font-weight: 600; cursor: pointer; }
        .export-btn { background: white; border: 1px solid #ddd; padding: 0.6rem 1.2rem; border-radius: 6px; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; color: #333; font-weight: 500; }
        
        .table-container { background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); overflow: hidden; }
        .toolbar { padding: 1rem; border-bottom: 1px solid #f0f0f0; }
        .search-bar { width: 300px; background: white; border: 1px solid #ddd; padding: 0.5rem 1rem; border-radius: 6px; display: flex; align-items: center; gap: 0.5rem; }
        .search-bar input { border: none; outline: none; width: 100%; }

        .data-table { width: 100%; border-collapse: collapse; }
        .data-table th, .data-table td { padding: 1rem 1.5rem; text-align: left; border-bottom: 1px solid #f0f0f0; }
        .data-table th { background: #f9fafb; color: #666; font-weight: 600; font-size: 0.9rem; }
        .fw-600 { font-weight: 600; }

        .action-row { display: flex; align-items: center; gap: 0.5rem; }
        .link-btn { background: none; border: none; color: #d32f2f; cursor: pointer; text-decoration: underline; font-size: 0.9rem; margin-right: 0.5rem; }
        .icon-btn { width: 30px; height: 30px; border-radius: 4px; display: flex; align-items: center; justify-content: center; border: 1px solid #eee; background: white; color: #666; cursor: pointer; }
        .icon-btn:hover { background: #f5f5f5; color: #333; }
        .icon-btn.delete:hover { background: #fef2f2; color: #dc2626; border-color: #fee2e2; }

        /* Modal */
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-content { background: white; padding: 2rem; border-radius: 12px; width: 90%; max-width: 500px; }
        .modal-content h2 { margin-top: 0; margin-bottom: 1.5rem; font-family: var(--font-playfair); }
        .form-group { margin-bottom: 1rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: #555; }
        .form-group input { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 6px; }
        .modal-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; }
        .btn-cancel { background: #f5f5f5; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; color: #666; font-weight: 600; }
        .btn-save { background: #d32f2f; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; color: white; font-weight: 600; }

        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .close-btn { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #888; }
        .history-list ul { padding-left: 1.2rem; color: #555; }
        .history-list li { margin-bottom: 0.5rem; }
      `}</style>
    </div>
  );
}
