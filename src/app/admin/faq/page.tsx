'use client';

import { useState } from 'react';
import { useFAQ, FAQ } from '@/context/FAQContext';

export default function AdminFAQ() {
  const { faqs, addFAQ, updateFAQ, deleteFAQ } = useFAQ();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<FAQ>>({});

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ question: '', answer: '', category: 'General', published: true });
    setIsModalOpen(true);
  };

  const handleEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    setFormData(faq);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      deleteFAQ(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateFAQ(editingId, formData);
    } else {
      addFAQ(formData as Omit<FAQ, 'id'>);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="faq-admin-page">
      <div className="page-header">
        <h1 className="page-title">FAQ Manager</h1>
        <button className="add-btn" onClick={handleAddNew}>
          <span className="material-symbols-outlined">add</span> Add New FAQ
        </button>
      </div>

      <div className="faq-list">
        {faqs.map(faq => (
          <div key={faq.id} className="faq-card">
            <div className="faq-content">
              <span className="category-badge">{faq.category}</span>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
            <div className="faq-actions">
              <button className="icon-btn edit" onClick={() => handleEdit(faq)} title="Edit">
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button className="icon-btn delete" onClick={() => handleDelete(faq.id)} title="Delete">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingId ? 'Edit FAQ' : 'Add New FAQ'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Question</label>
                <input 
                  type="text" 
                  required 
                  value={formData.question || ''} 
                  onChange={e => setFormData({...formData, question: e.target.value})} 
                  placeholder="e.g., What is your return policy?"
                />
              </div>
              
              <div className="form-group">
                <label>Answer</label>
                <textarea 
                  required 
                  rows={4}
                  value={formData.answer || ''} 
                  onChange={e => setFormData({...formData, answer: e.target.value})} 
                  placeholder="Enter the detailed answer here..."
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select 
                    value={formData.category || 'General'} 
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="General">General</option>
                    <option value="Orders">Orders</option>
                    <option value="Shipping">Shipping</option>
                    <option value="Payments">Payments</option>
                    <option value="Returns">Returns</option>
                  </select>
                </div>
                <div className="form-group checkbox-group">
                   <label>Status</label>
                   <div className="toggle">
                     <input 
                       type="checkbox" 
                       checked={formData.published} 
                       onChange={e => setFormData({...formData, published: e.target.checked})} 
                     />
                     <span>{formData.published ? 'Published' : 'Draft'}</span>
                   </div>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-save">Save FAQ</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .page-title { font-family: var(--font-playfair); font-size: 1.8rem; color: #1a1a1a; margin: 0; }
        .add-btn { background: #d32f2f; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 6px; display: flex; align-items: center; gap: 0.5rem; font-weight: 600; cursor: pointer; }

        .faq-list { display: grid; gap: 1rem; }
        .faq-card { background: white; padding: 1.5rem; border-radius: 12px; border: 1px solid #eee; display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; transition: box-shadow 0.2s; }
        .faq-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        
        .faq-content { flex: 1; }
        .category-badge { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; color: #666; background: #f5f5f5; padding: 0.2rem 0.6rem; border-radius: 4px; display: inline-block; margin-bottom: 0.5rem; }
        .faq-content h3 { margin: 0 0 0.5rem 0; font-size: 1.1rem; color: #1a1a1a; }
        .faq-content p { margin: 0; color: #555; font-size: 0.95rem; line-height: 1.5; }

        .faq-actions { display: flex; gap: 0.5rem; }
        .icon-btn { width: 32px; height: 32px; border-radius: 6px; border: 1px solid #eee; background: white; color: #666; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .icon-btn:hover { background: #f5f5f5; color: #333; }
        .icon-btn.delete:hover { background: #fef2f2; color: #d32f2f; border-color: #fee2e2; }
        .icon-btn.edit:hover { background: #eff6ff; color: #2563eb; border-color: #dbeafe; }

        /* Modal */
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-content { background: white; padding: 2rem; border-radius: 12px; width: 90%; max-width: 600px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
        .modal-content h2 { margin-top: 0; margin-bottom: 1.5rem; font-family: var(--font-playfair); }
        
        .form-group { margin-bottom: 1.2rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: #444; }
        .form-group input[type="text"], .form-group textarea, .form-group select { width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; transition: border 0.2s; }
        .form-group input:focus, .form-group textarea:focus { border-color: #d32f2f; outline: none; }
        
        .checkbox-group .toggle { display: flex; align-items: center; gap: 0.5rem; }
        
        .modal-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; }
        .btn-cancel { background: #f5f5f5; border: none; padding: 0.8rem 1.5rem; border-radius: 8px; cursor: pointer; color: #666; font-weight: 600; }
        .btn-save { background: #d32f2f; border: none; padding: 0.8rem 1.5rem; border-radius: 8px; cursor: pointer; color: white; font-weight: 600; }
      `}</style>
    </div>
  );
}
