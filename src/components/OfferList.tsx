'use client';

import { useCart } from '@/context/CartContext';

const offers = [
  {
    id: 1,
    title: "Mega Family Festival Bundle",
    description: "Complete festival outfit set for a family of 4. Includes 1 Men's Mundu Set, 1 Women's Silk Saree, and 2 Kids' Party Wear outfits.",
    originalPrice: 12999,
    offerPrice: 9999,
    discount: "23% OFF",
    items: [
      "1x Premium Men's Shirt & Mundu",
      "1x Kanchipuram Art Silk Saree",
      "2x Kids Festive Sets (Boy/Girl)"
    ],
    category: "family",
    image: "/products/placeholder.png" // Placeholder
  },
  {
    id: 2,
    title: "Premium Saree Trio",
    description: "Elegant collection of 3 distinctive sarees for different occasions. Perfect for gifting or wardrobe refresh.",
    originalPrice: 5999,
    offerPrice: 3999,
    discount: "33% OFF",
    items: [
      "1x Banarasi Butta Saree",
      "1x Cotton Silk Daily Wear",
      "1x Georgette Party Wear"
    ],
    category: "saree",
    image: "/products/placeholder.png"
  },
  {
    id: 3,
    title: "Authentic Mundu Pack",
    description: "The essential Kerala traditional wear pack for men. High quality cotton with golden kasavu border.",
    originalPrice: 2499,
    offerPrice: 1899,
    discount: "24% OFF",
    items: [
      "2x Double Mundu with Kasavu",
      "1x Single Daily Wear Mundu",
      "Matching Angavastram"
    ],
    category: "mundu",
    image: "/products/placeholder.png"
  },
  {
    id: 4,
    title: "Churidhar Materials Combo",
    description: "Unstitched churidhar materials in trendy designs. Mix and match to create your perfect style.",
    originalPrice: 3499,
    offerPrice: 2499,
    discount: "28% OFF",
    items: [
      "1x Cotton Print Set",
      "1x Synthetic Party Wear",
      "1x Embroidered Neck Design"
    ],
    category: "churidhar",
    image: "/products/placeholder.png"
  },
  {
    id: 5,
    title: "Kids' Smart Casuals",
    description: "Comfortable and stylish daily wear combo for children. Durable fabrics and fun designs.",
    originalPrice: 2999,
    offerPrice: 1999,
    discount: "33% OFF",
    items: [
      "3x T-Shirts / Tops",
      "2x Shorts / Skirts",
      "1x Denim Jeans"
    ],
    category: "kids",
    image: "/products/placeholder.png"
  },
  {
    id: 6,
    title: "Wedding Guest Special",
    description: "Look your best at any wedding with this curated set for couples.",
    originalPrice: 6500,
    offerPrice: 4999,
    discount: "23% OFF",
    items: [
      "1x Designer Saree",
      "1x Men's Silk Shirt & Mundu",
      "Accessories Kit"
    ],
    category: "wedding",
    image: "/products/placeholder.png"
  }
];

export default function OfferList() {
  const { addToCart } = useCart();

  const handleClaim = (offer: typeof offers[0]) => {
    addToCart({
      id: `offer-${offer.id}`,
      name: offer.title,
      price: offer.offerPrice,
      image: offer.image,
      variant: 'Bundle'
    });
  };

  return (
    <>
      <div className="section-header">
        <h2 className="section-title">Exclusive Bundled Offers</h2>
        <p className="section-subtitle">
          Unbeatable value packs curated just for you
        </p>
      </div>

      <div className="grid grid-3">
        {offers.map((offer) => (
          <div key={offer.id} className="card product-card" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Discount Badge */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '-35px',
              background: '#f59e0b',
              color: 'white',
              padding: '5px 40px',
              transform: 'rotate(45deg)',
              fontWeight: 'bold',
              zIndex: 10,
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }}>
              {offer.discount}
            </div>

            <div className="product-info" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ 
                  textTransform: 'uppercase', 
                  fontSize: '0.8rem', 
                  letterSpacing: '1px',
                  color: 'var(--color-primary)',
                  fontWeight: 600
                }}>
                  {offer.category} Bundle
                </span>
                <h3 className="product-name" style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>{offer.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{offer.description}</p>
              </div>

              <div style={{ background: 'var(--color-bg-tertiary)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>What&apos;s Included:</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {offer.items.map((item, idx) => (
                    <li key={idx} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      marginBottom: '0.25rem', 
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)'
                    }}>
                      <span style={{ color: 'var(--color-success)' }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                    ₹{offer.offerPrice.toLocaleString('en-IN')}
                  </span>
                  <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                    ₹{offer.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                
                <button 
                  className="btn-primary" 
                  style={{ width: '100%' }}
                  onClick={() => handleClaim(offer)}
                >
                  Claim Offer Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
