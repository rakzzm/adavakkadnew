'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    setTimeout(() => {
      alert(`Order Placed Successfully!\n\nOrder ID: #${Math.floor(Math.random() * 100000)}\nAmount: ₹${total}\nPayment: ${paymentMethod.toUpperCase()}`);
      clearCart();
      router.push('/');
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="container" style={{ marginTop: '120px', textAlign: 'center', minHeight: '50vh' }}>
         <h2>Your cart is empty</h2>
         <p>Add some products to proceed to checkout.</p>
         <button onClick={() => router.push('/products')} className="btn-primary" style={{ marginTop: '1rem' }}>
           Browse Products
         </button>
      </div>
    );
  }

  return (
    <section style={{ marginTop: '100px', marginBottom: '60px' }}>
      <div className="container">
        <h1 className="section-title text-center" style={{ marginBottom: '2rem' }}>Checkout</h1>

        <div className="grid grid-2" style={{ alignItems: 'start' }}>
          {/* Shipping Details */}
          <div className="card">
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>Shipping Details</h3>
            
            <form id="checkout-form" onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>First Name *</label>
                  <input required name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" className="filter-input" style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Last Name *</label>
                  <input required name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" className="filter-input" style={{ width: '100%' }} />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Email Address *</label>
                <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="filter-input" style={{ width: '100%' }} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Phone Number *</label>
                <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="filter-input" style={{ width: '100%' }} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                 <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Address *</label>
                 <input required name="address" value={formData.address} onChange={handleInputChange} type="text" className="filter-input" style={{ width: '100%' }} placeholder="Street, House No, etc." />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>City *</label>
                  <input required name="city" value={formData.city} onChange={handleInputChange} type="text" className="filter-input" style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>ZIP Code *</label>
                  <input required name="zip" value={formData.zip} onChange={handleInputChange} type="text" className="filter-input" style={{ width: '100%' }} />
                </div>
              </div>

              <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>Payment Method</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', border: paymentMethod === 'cod' ? '2px solid var(--color-primary)' : '1px solid #eee', borderRadius: '8px', cursor: 'pointer', background: paymentMethod === 'cod' ? '#f0f4ff' : 'white' }}>
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                  <span style={{ fontWeight: 600 }}>Cash on Delivery (COD)</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', border: paymentMethod === 'upi' ? '2px solid var(--color-primary)' : '1px solid #eee', borderRadius: '8px', cursor: 'pointer', background: paymentMethod === 'upi' ? '#f0f4ff' : 'white' }}>
                  <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                  <span>UPI / QR Code</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', border: paymentMethod === 'card' ? '2px solid var(--color-primary)' : '1px solid #eee', borderRadius: '8px', cursor: 'pointer', background: paymentMethod === 'card' ? '#f0f4ff' : 'white' }}>
                   <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                   <span>Credit / Debit Card</span>
                </label>
              </div>

              {/* Fake Card inputs if Card selected */}
              {paymentMethod === 'card' && (
                <div style={{ marginTop: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '8px' }}>
                  <input type="text" placeholder="Card Number" className="filter-input" style={{ width: '100%', marginBottom: '0.5rem' }} />
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <input type="text" placeholder="MM/YY" className="filter-input" style={{ width: '100%' }} />
                    <input type="text" placeholder="CVC" className="filter-input" style={{ width: '100%' }} />
                  </div>
                </div>
              )}

            </form>
          </div>

          {/* Order Summary */}
          <div className="card" style={{ position: 'sticky', top: '100px' }}>
             <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>Order Summary</h3>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
               {items.map((item, idx) => (
                 <div key={`${item.id}-${idx}`} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                    <span>{item.quantity}x {item.name} <small style={{ color: 'gray' }}>({item.size})</small></span>
                    <span style={{ fontWeight: 600 }}>₹{item.price * item.quantity}</span>
                 </div>
               ))}
             </div>

             <div style={{ borderTop: '1px dashed #ccc', paddingTop: '1rem', marginTop: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'green' }}>
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 700, borderTop: '2px solid #eee', paddingTop: '1rem' }}>
                  <span>Grand Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
             </div>

             <button type="submit" form="checkout-form" className="btn-primary" style={{ width: '100%', marginTop: '2rem' }}>
               Place Order
             </button>
             
             <p style={{ textAlign: 'center', fontSize: '0.8rem', marginTop: '1rem', color: 'gray' }}>
               Secure Checkout powered by Advakkad
             </p>
          </div>
        </div>
      </div>
    </section>
  );
}
