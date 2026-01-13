'use client';

import { useState } from 'react';

export default function AdminTaxCalculator() {
  const [amount, setAmount] = useState<number | ''>('');
  const [taxRate, setTaxRate] = useState<number | ''>('');
  const [result, setResult] = useState<{ tax: number; total: number } | null>(null);

  const calculate = () => {
    const numAmount = Number(amount);
    const numRate = Number(taxRate);
    if (!numAmount || !numRate) return;

    const tax = (numAmount * numRate) / 100;
    const total = numAmount + tax;
    setResult({ tax, total });
  };

  const clear = () => {
    setAmount('');
    setTaxRate('');
    setResult(null);
  };

  return (
    <div className="tax-page">
      <h1 className="page-title">Tax Calculator</h1>
      
      <div className="calculator-card">
        <div className="input-group">
          <label>Base Amount (₹)</label>
          <input 
            type="number" 
            value={amount} 
            onChange={e => setAmount(Number(e.target.value))} 
            placeholder="Enter amount" 
          />
        </div>

        <div className="input-group">
          <label>Tax Rate (%)</label>
          <input 
            type="number" 
            value={taxRate} 
            onChange={e => setTaxRate(Number(e.target.value))} 
            placeholder="e.g., 18" 
          />
        </div>

        <div className="actions">
          <button onClick={clear} className="btn-clear">Clear</button>
          <button onClick={calculate} className="btn-calc">Calculate</button>
        </div>

        {result && (
          <div className="result-area">
            <div className="result-row">
              <span>Tax Amount:</span>
              <span className="val bad">₹ {result.tax.toFixed(2)}</span>
            </div>
            <div className="result-row total">
              <span>Total Payable:</span>
              <span className="val good">₹ {result.total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .tax-page { max-width: 600px; margin: 0 auto; }
        .page-title { font-family: var(--font-playfair); font-size: 1.8rem; margin-bottom: 2rem; color: #1a1a1a; }
        
        .calculator-card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); border: 1px solid #eee; }
        
        .input-group { margin-bottom: 1.5rem; }
        .input-group label { display: block; margin-bottom: 0.5rem; color: #555; font-weight: 500; }
        .input-group input { width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; }
        .input-group input:focus { border-color: #d32f2f; outline: none; }

        .actions { display: flex; gap: 1rem; margin-top: 2rem; }
        .btn-calc { flex: 2; background: #d32f2f; color: white; border: none; padding: 0.8rem; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
        .btn-calc:hover { background: #b71c1c; }
        .btn-clear { flex: 1; background: #f5f5f5; color: #666; border: none; padding: 0.8rem; border-radius: 8px; font-weight: 600; cursor: pointer; }

        .result-area { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px dashed #ddd; }
        .result-row { display: flex; justify-content: space-between; margin-bottom: 0.8rem; font-size: 1.1rem; }
        .result-row.total { font-size: 1.4rem; font-weight: 700; color: #1a1a1a; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #eee; }
        .val.bad { color: #d32f2f; }
        .val.good { color: #2e7d32; }
      `}</style>
    </div>
  );
}
