'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    siteName: 'Adavakkad Collections',
    adminEmail: 'abhilash@adavakkad.com',
    currency: 'INR',
    metaTitle: 'Adavakkad Collections - Premium Wedding Center',
    metaDescription: 'Shop the best wedding collections and ethnic wear.',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    enableNotifications: true,
    emailNotifications: true,
    twoFactorAuth: false,
    autoBackup: true,
    backupFrequency: 'daily'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your application settings and preferences</p>
      </div>

      <div className="settings-container">
        {/* Tabs */}
        <div className="settings-tabs">
          <button 
            className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            <span className="material-symbols-outlined">settings</span>
            General
          </button>
          <button 
            className={`tab-btn ${activeTab === 'seo' ? 'active' : ''}`}
            onClick={() => setActiveTab('seo')}
          >
            <span className="material-symbols-outlined">search</span>
            SEO
          </button>
          <button 
            className={`tab-btn ${activeTab === 'social' ? 'active' : ''}`}
            onClick={() => setActiveTab('social')}
          >
            <span className="material-symbols-outlined">share</span>
            Social
          </button>
          <button 
            className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <span className="material-symbols-outlined">notifications</span>
            Notifications
          </button>
          <button 
            className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <span className="material-symbols-outlined">security</span>
            Security
          </button>
          <button 
            className={`tab-btn ${activeTab === 'backup' ? 'active' : ''}`}
            onClick={() => setActiveTab('backup')}
          >
            <span className="material-symbols-outlined">backup</span>
            Backup
          </button>
          <button 
            className={`tab-btn ${activeTab === 'ui' ? 'active' : ''}`}
            onClick={() => setActiveTab('ui')}
          >
            <span className="material-symbols-outlined">style</span>
            UI Components
          </button>
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <span className="material-symbols-outlined">manage_accounts</span>
            Profile
          </button>
          <button 
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <span className="material-symbols-outlined">admin_panel_settings</span>
            Users
          </button>
        </div>

        {/* Content */}
        <div className="tab-content">
          <form onSubmit={(e) => e.preventDefault()}>
            
            {activeTab === 'general' && (
              <div className="form-section fade-in">
                <h3 className="section-title">General Settings</h3>
                <div className="form-group">
                  <label>Site Name</label>
                  <input type="text" name="siteName" value={formData.siteName} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                  <label>Admin Email</label>
                  <input type="email" name="adminEmail" value={formData.adminEmail} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                  <label>Currency</label>
                  <select name="currency" value={formData.currency} onChange={handleChange} className="form-control">
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="form-section fade-in">
                <h3 className="section-title">SEO Settings</h3>
                <div className="form-group">
                  <label>Meta Title</label>
                  <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleChange} className="form-control" />
                </div>
                 <div className="form-group">
                  <label>Meta Description</label>
                  <textarea name="metaDescription" value={formData.metaDescription} onChange={handleChange} className="form-control" rows={4} />
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="form-section fade-in">
                <h3 className="section-title">Social Media Links</h3>
                <div className="form-group">
                  <label>Facebook URL</label>
                  <input type="url" name="facebook" value={formData.facebook} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                  <label>Instagram URL</label>
                  <input type="url" name="instagram" value={formData.instagram} onChange={handleChange} className="form-control" />
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="form-section fade-in">
                <h3 className="section-title">Notification Preferences</h3>
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="enableNotifications" 
                      checked={formData.enableNotifications} 
                      onChange={handleChange} 
                    />
                    <span>Enable Push Notifications</span>
                  </label>
                </div>
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="emailNotifications" 
                      checked={formData.emailNotifications} 
                      onChange={handleChange} 
                    />
                    <span>Email Notifications for Orders</span>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="form-section fade-in">
                <h3 className="section-title">Security Settings</h3>
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="twoFactorAuth" 
                      checked={formData.twoFactorAuth} 
                      onChange={handleChange} 
                    />
                    <span>Enable Two-Factor Authentication</span>
                  </label>
                </div>
                <div className="form-group">
                  <label>Change Password</label>
                  <input type="password" placeholder="New Password" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input type="password" placeholder="Confirm New Password" className="form-control" />
                </div>
              </div>
            )}

            {activeTab === 'backup' && (
              <div className="form-section fade-in">
                <h3 className="section-title">Backup & Data Management</h3>
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="autoBackup" 
                      checked={formData.autoBackup} 
                      onChange={handleChange} 
                    />
                    <span>Enable Automatic Backups</span>
                  </label>
                </div>
                <div className="form-group">
                  <label>Backup Frequency</label>
                  <select name="backupFrequency" value={formData.backupFrequency} onChange={handleChange} className="form-control">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div className="backup-actions">
                  <button type="button" className="btn-secondary">Download Backup</button>
                  <button type="button" className="btn-secondary">Restore from Backup</button>
                </div>
              </div>
            )}

            {activeTab === 'ui' && (
              <div className="form-section fade-in">
                <h3 className="section-title">UI Components</h3>
                <p className="section-description">Access UI component library and design system</p>
                <div className="ui-components-link">
                  <Link href="/admin/ui" className="btn-ui-components">
                    <span className="material-symbols-outlined">style</span>
                    Open UI Components Library
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="form-section fade-in">
                <h3 className="section-title">Profile Management</h3>
                <p className="section-description">Manage your admin profile and preferences</p>
                <div className="ui-components-link">
                  <Link href="/admin/profile" className="btn-ui-components">
                    <span className="material-symbols-outlined">manage_accounts</span>
                    Open Profile Settings
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="form-section fade-in">
                <h3 className="section-title">User Management</h3>
                <p className="section-description">Manage user access and permissions</p>
                <div className="ui-components-link">
                  <Link href="/admin/users" className="btn-ui-components">
                    <span className="material-symbols-outlined">admin_panel_settings</span>
                    Open User Management
                  </Link>
                </div>
              </div>
            )}

            <div className="form-actions">
              <button className="btn-save">Save Changes</button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .page-header { margin-bottom: 2rem; }
        .page-title { font-family: var(--font-playfair); font-size: 2rem; color: #1a1a1a; margin-bottom: 0.5rem; }
        .page-subtitle { color: #666; font-size: 1rem; }

        .settings-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
          overflow: hidden;
        }

        .settings-tabs {
          display: flex;
          border-bottom: 1px solid #eee;
          background: #fafafa;
          padding: 0 1rem;
          overflow-x: auto;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
          font-weight: 500;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .tab-btn .material-symbols-outlined { font-size: 1.2rem; }
        .tab-btn:hover { color: #333; }
        .tab-btn.active { color: #E91E63; border-bottom-color: #E91E63; background: white; }

        .tab-content { padding: 2rem; }

        .section-title { font-size: 1.3rem; color: #1a1a1a; margin-bottom: 1.5rem; font-weight: 600; }
        .section-description { color: #666; margin-bottom: 1.5rem; }

        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; color: #555; font-weight: 500; }
        .form-control { 
          width: 100%; 
          padding: 0.75rem; 
          border: 1px solid #ddd; 
          border-radius: 6px; 
          font-size: 1rem;
          transition: border-color 0.2s;
        }
        .form-control:focus { border-color: #E91E63; outline: none; box-shadow: 0 0 0 3px rgba(233, 30, 99, 0.1); }

        .checkbox-group { display: flex; align-items: center; }
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          user-select: none;
        }
        .checkbox-label input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #E91E63;
        }

        .backup-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .btn-secondary {
          background: #f5f5f5;
          color: #333;
          border: 1px solid #ddd;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-secondary:hover { background: #e0e0e0; }

        .ui-components-link {
          display: flex;
          justify-content: center;
          padding: 2rem 0;
        }

        .btn-ui-components {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: linear-gradient(135deg, #E91E63 0%, #C2185B 100%);
          color: white;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 12px rgba(233, 30, 99, 0.3);
        }
        .btn-ui-components:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(233, 30, 99, 0.4);
        }

        .form-actions { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #eee; text-align: right; }
        .btn-save { 
          background: #E91E63; 
          color: white; 
          border: none; 
          padding: 0.75rem 2rem; 
          border-radius: 6px; 
          font-weight: 600; 
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn-save:hover { background: #C2185B; }

        .fade-in { animation: fadeIn 0.3s ease-in; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
