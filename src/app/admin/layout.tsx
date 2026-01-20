'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Comprehensive menu with all features
  const menuItems = [
    { name: 'Dashboard', icon: 'grid_view', path: '/admin/dashboard' },
    { name: 'Products', icon: 'inventory_2', path: '/admin/products' },
    { name: 'Inventory', icon: 'warehouse', path: '/admin/products/inventory' },
    { name: 'Orders', icon: 'shopping_cart', path: '/admin/orders' },
    { name: 'Returns', icon: 'assignment_return', path: '/admin/orders/returns' },
    { name: 'Customers', icon: 'group', path: '/admin/customers' },
    { name: 'Segments', icon: 'workspaces', path: '/admin/customers/segments' },
    { name: 'Buyers', icon: 'storefront', path: '/admin/buyers' },
    { name: 'Invoices', icon: 'receipt_long', path: '/admin/invoices' },
    { name: 'Chat', icon: 'forum', path: '/admin/chat' },
    { name: 'Email', icon: 'email', path: '/admin/email' },
    { name: 'To-Do List', icon: 'checklist', path: '/admin/todo' },
    { name: 'Tax Calculator', icon: 'calculate', path: '/admin/tax' },
    { name: 'Social Media', icon: 'share', path: '/admin/social' },
    { name: 'Settings', icon: 'settings', path: '/admin/settings' },
    { name: 'FAQ Manager', icon: 'help', path: '/admin/faq' },
  ];

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
           <div className="brand-logo">
             {/* <span className="material-symbols-outlined logo-icon">diamond</span> */}
             <div className="brand-text">
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Image src="/logo/admin-logo.jpg" alt="Adavakkad Admin" fill style={{ objectFit: 'contain' }} />
                </div>
             </div>
           </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item, idx) => (
            <Link 
              key={idx}
              href={item.path}
              className={`nav-item ${pathname === item.path ? 'active' : ''}`}
            >
              <span className="material-symbols-outlined icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button onClick={logout} className="logout-btn">
            <span className="material-symbols-outlined">logout</span>
            <span className="nav-text">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <button 
              className="toggle-sidebar"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <span className="material-symbols-outlined">menu_open</span>
            </button>
            <h1 className="header-title">
              {menuItems.find(i => i.path === pathname)?.name || 'Dashboard'}
            </h1>
          </div>
          <div className="user-profile">
            <div className="user-info">
              <span className="user-name">{user?.name || 'Administrator'}</span>
              <span className="user-role">Super Admin</span>
            </div>
            <div className="avatar">
               {user?.name?.[0] || 'A'}
            </div>
          </div>
        </header>

        <div className="content-area">
          {children}
        </div>
      </main>

      <style jsx>{`
        .admin-container {
          display: flex;
          min-height: 100vh;
          background-color: #f8fafc;
          font-family: var(--font-outfit), sans-serif;
          position: relative;
          z-index: 1;
        }

        /* Sidebar Styles */
        .admin-sidebar {
          background: #FFFFFF;
          color: #1a1a1a;
          width: 280px;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          z-index: 100;
          overflow-y: auto;
          box-shadow: 4px 0 24px rgba(0,0,0,0.08);
          border-right: 1px solid #e0e0e0;
        }

        .admin-sidebar::-webkit-scrollbar { width: 10px; }
        .admin-sidebar::-webkit-scrollbar-track { background: #f0f0f0; }
        .admin-sidebar::-webkit-scrollbar-thumb { background: #E91E63; border-radius: 5px; }
        .admin-sidebar::-webkit-scrollbar-thumb:hover { background: #C2185B; }

        .admin-sidebar.closed { width: 80px; }
        .admin-sidebar.closed .nav-text, 
        .admin-sidebar.closed .group-title, 
        .admin-sidebar.closed .chevron, 
        .admin-sidebar.closed .submenu,
        .admin-sidebar.closed .brand-text,
        .admin-sidebar.closed .sidebar-footer .nav-text { display: none; }
        
        .sidebar-header {
          padding: 1rem;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #FFFFFF;
          border-bottom: 2px solid #E91E63;
        }

        .brand-logo { 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          width: 100%; 
          height: 100%;
          overflow: hidden; 
        }
        
        .brand-text { 
          display: flex; 
          justify-content: center; 
          align-items: center;
          width: 100%; 
          height: 100%;
          padding: 1rem;
        }

        .admin-sidebar.closed .sidebar-header { padding: 0.5rem; height: 70px; }
        /* .logo-icon { color: #d32f2f; font-size: 2rem; min-width: 32px; } */
        /* .brand-text h2 { margin: 0; font-family: var(--font-playfair); font-size: 1.4rem; letter-spacing: 0.5px; white-space: nowrap; } */
        /* .brand-text p { margin: 0; font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 1px; white-space: nowrap; } */

        .sidebar-nav { flex: 1; padding: 2rem 1rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .menu-group { margin-bottom: 2rem; }
        .group-title {
          font-size: 0.7rem;
          text-transform: uppercase;
          color: #666;
          margin-bottom: 0.8rem;
          padding-left: 1rem;
          font-weight: 600;
          letter-spacing: 1px;
        }

        .menu-item-container { margin-bottom: 0.25rem; }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          color: #1a1a1a !important;
          text-decoration: none;
          transition: all 0.3s ease;
          border-radius: 8px;
          font-size: 1.2rem;
          font-weight: 500;
          user-select: none;
          position: relative;
        }

        .admin-sidebar .nav-item {
          color: #1a1a1a !important;
        }

        .admin-sidebar .nav-item * {
          color: #1a1a1a !important;
        }

        .nav-item:hover {
          background: rgba(233, 30, 99, 0.08);
          color: #1a1a1a !important;
        }

        .nav-item.active {
          background: linear-gradient(90deg, #E91E63 0%, #C2185B 100%);
          color: #FFFFFF !important;
          font-weight: 600;
        }

        .nav-item.active * {
          color: #FFFFFF !important;
        }

        .nav-item .icon { 
          font-size: 1.8rem; 
          min-width: 32px; 
          transition: color 0.2s; 
          color: #1a1a1a !important; 
        }
        .nav-item.active .icon { color: #FFFFFF !important; }
        .nav-item .nav-text { color: #1a1a1a !important; font-size: 1.2rem; }
        .nav-item.active .nav-text { color: #FFFFFF !important; }
        .nav-item span { color: #1a1a1a !important; }
        .nav-item.active span { color: #FFFFFF !important; }
        
        .chevron { font-size: 1.2rem; color: #666; transition: transform 0.3s ease; }
        .nav-item.expanded .chevron { transform: rotate(180deg); color: #ef5350; }

        .submenu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          padding-left: 1rem;
          display: flex;
          flex-direction: column;
        }
        .submenu.open { max-height: 500px; padding-top: 0.25rem; padding-bottom: 0.5rem; }

        .sub-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0.6rem 1rem 0.6rem 2.5rem;
          color: #888;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.2s;
          border-radius: 6px;
          position: relative;
        }

        .sub-nav-item:hover { color: white; background: rgba(255,255,255,0.03); }
        
        .dot {
          width: 5px;
          height: 5px;
          background-color: #555;
          border-radius: 50%;
          transition: all 0.2s;
        }
        
        .sub-nav-item:hover .dot { background-color: #d32f2f; transform: scale(1.2); }

        .sidebar-footer { padding: 1.5rem; border-top: 1px solid #e0e0e0; background: #f5f5f5; }
        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 1rem;
          background: transparent;
          border: none;
          color: #1a1a1a !important;
          cursor: pointer;
          padding: 1rem 1.25rem;
          border-radius: 8px;
          transition: all 0.2s;
          font-weight: 500;
        }
        .logout-btn:hover { background: rgba(233, 30, 99, 0.08); color: #E91E63 !important; }
        .logout-btn * { color: #1a1a1a !important; }
        .logout-btn:hover * { color: #E91E63 !important; }
        .admin-sidebar.closed .logout-btn { padding: 1rem; justify-content: center; }

        /* Main Content */
        .admin-main {
          flex: 1;
          margin-left: 280px;
          transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          width: calc(100% - 280px);
        }
        .admin-sidebar.closed ~ .admin-main { margin-left: 80px; width: calc(100% - 80px); }

        .admin-header {
          background: white;
          padding: 0 2rem;
          height: 80px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #eee;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .header-left { display: flex; align-items: center; gap: 1.5rem; }
        .toggle-sidebar { background: none; border: none; cursor: pointer; color: #555; padding: 0.5rem; border-radius: 50%; transition: background 0.2s; }
        .toggle-sidebar:hover { background: #f0f0f0; color: #1a1a1a; }
        .header-title { font-size: 1.5rem; font-family: var(--font-playfair); color: #1a1a1a; margin: 0; }

        .user-profile { display: flex; align-items: center; gap: 1rem; padding: 0.5rem; border-radius: 50px; transition: background 0.2s; cursor: pointer; }
        .user-profile:hover { background: #f5f5f5; }
        .user-info { text-align: right; line-height: 1.2; }
        .user-name { display: block; font-weight: 600; color: #333; font-size: 0.95rem; }
        .user-role { display: block; font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 0.5px; }
        
        .avatar {
          width: 42px;
          height: 42px;
          background: linear-gradient(135deg, #E91E63 0%, #C2185B 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1.1rem;
          box-shadow: 0 4px 10px rgba(233, 30, 99, 0.3);
        }

        .content-area { padding: 2.5rem; flex: 1; overflow-y: auto; max-width: 1600px; margin: 0 auto; width: 100%; }
      `}</style>
    </div>
  );
}
