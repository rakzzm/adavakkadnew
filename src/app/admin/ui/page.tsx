'use client';

export default function UIElementsPage() {
  return (
    <div className="ui-page">
      <div className="page-header">
        <h1 className="page-title">UI Elements</h1>
        <p className="page-subtitle">Components and styles used across the admin dashboard.</p>
      </div>

      <div className="ui-grid">
        
        {/* Buttons Section */}
        <div className="ui-card">
          <h2>Buttons</h2>
          <div className="card-content">
            <div className="demo-row">
              <button className="btn btn-primary">Primary Button</button>
              <button className="btn btn-secondary">Secondary Button</button>
              <button className="btn btn-outline">Outline Button</button>
              <button className="btn btn-danger">Danger Button</button>
            </div>
            <div className="demo-row">
              <button className="btn btn-sm btn-primary">Small</button>
              <button className="btn btn-primary">Default</button>
              <button className="btn btn-lg btn-primary">Large</button>
            </div>
          </div>
        </div>

        {/* Badges/Status Section */}
        <div className="ui-card">
          <h2>Badges & Status</h2>
          <div className="card-content">
            <div className="demo-row">
              <span className="badge badge-success">Delivered</span>
              <span className="badge badge-warning">Pending</span>
              <span className="badge badge-info">Shipped</span>
              <span className="badge badge-danger">Cancelled</span>
            </div>
            <div className="demo-row">
              <span className="tag">Women</span>
              <span className="tag">Men</span>
              <span className="tag">Kids</span>
            </div>
          </div>
        </div>

        {/* Form Elements */}
        <div className="ui-card">
          <h2>Form Inputs</h2>
          <div className="card-content">
            <div className="form-group">
              <label>Text Input</label>
              <input type="text" className="form-control" placeholder="Enter text..." />
            </div>
            <div className="form-group">
              <label>Select Input</label>
              <select className="form-control">
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>
             <div className="demo-row">
               <label className="checkbox">
                 <input type="checkbox" defaultChecked /> Checkbox
               </label>
               <label className="radio">
                 <input type="radio" name="demo" defaultChecked /> Radio
               </label>
             </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="ui-card">
          <h2>Alerts</h2>
          <div className="card-content">
            <div className="alert alert-info">
              <span className="material-symbols-outlined">info</span>
              This is an informational alert.
            </div>
            <div className="alert alert-success">
              <span className="material-symbols-outlined">check_circle</span>
              Success! Operation completed.
            </div>
            <div className="alert alert-warning">
              <span className="material-symbols-outlined">warning</span>
              Warning: Check your input.
            </div>
            <div className="alert alert-danger">
              <span className="material-symbols-outlined">error</span>
              Error: Something went wrong.
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        .page-header {
          margin-bottom: 2rem;
        }

        .page-title {
          font-family: var(--font-playfair);
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: #1a1a1a;
        }

        .page-subtitle {
          color: #666;
        }

        .ui-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 1.5rem;
        }

        .ui-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .ui-card h2 {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #eee;
          padding-bottom: 0.5rem;
          color: #333;
        }

        .card-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .demo-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: center;
        }

        /* Buttons */
        .btn {
          border: none;
          border-radius: 6px;
          padding: 0.6rem 1.2rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .btn-primary { background: #d32f2f; color: white; }
        .btn-primary:hover { background: #b71c1c; }

        .btn-secondary { background: #1a1a1a; color: white; }
        .btn-secondary:hover { background: #333; }

        .btn-outline { background: transparent; border: 1px solid #ddd; color: #333; }
        .btn-outline:hover { background: #f5f5f5; }

        .btn-danger { background: #fee2e2; color: #dc2626; }
        .btn-danger:hover { background: #fecaca; }

        .btn-sm { padding: 0.4rem 0.8rem; font-size: 0.85rem; }
        .btn-lg { padding: 0.8rem 1.6rem; font-size: 1.1rem; }

        /* Badges */
        .badge {
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .badge-success { background: #ecfdf5; color: #047857; }
        .badge-warning { background: #fff7ed; color: #c2410c; }
        .badge-info { background: #eff6ff; color: #1d4ed8; }
        .badge-danger { background: #fef2f2; color: #b91c1c; }

        .tag {
          background: #f3f4f6;
          color: #4b5563;
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          font-size: 0.9rem;
        }

        /* Forms */
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #555;
          font-weight: 500;
        }

        .form-control {
          width: 100%;
          padding: 0.6rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 0.95rem;
        }
        
        .checkbox, .radio {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        /* Alerts */
        .alert {
          padding: 1rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.95rem;
        }
        
        .alert-info { background: #eff6ff; color: #1e3a8a; border: 1px solid #dbeafe; }
        .alert-success { background: #ecfdf5; color: #064e3b; border: 1px solid #d1fae5; }
        .alert-warning { background: #fffbeb; color: #92400e; border: 1px solid #fde68a; }
        .alert-danger { background: #fef2f2; color: #991b1b; border: 1px solid #fee2e2; }
      `}</style>
    </div>
  );
}
