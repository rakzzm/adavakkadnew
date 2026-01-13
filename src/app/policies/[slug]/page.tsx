import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return [
    { slug: 'privacy-policy' },
    { slug: 'refund-policy' },
    { slug: 'delivery-services' },
    { slug: 'promotions' },
  ];
}

const policyContent: Record<string, { title: string; subtitle: string; content: React.ReactNode }> = {
  'privacy-policy': {
    title: 'Privacy Policy',
    subtitle: 'Your privacy is important to us.',
    content: (
      <div className="card" style={{ padding: '2rem' }}>
        <h3>1. Information We Collect</h3>
        <p>We collect information you provide directly to us, such as when you create an account, place an order, subscribe to our newsletter, or contact us.</p>
        
        <h3 style={{ marginTop: '1.5rem' }}>2. How We Use Your Information</h3>
        <p>We use the information we collect to process your orders, communicate with you, improved our services, and personalize your experience.</p>
        
        <h3 style={{ marginTop: '1.5rem' }}>3. Sharing of Information</h3>
        <p>We do not share your personal information with third parties except as necessary to provide our services (e.g., shipping providers) or as required by law.</p>
        
        <h3 style={{ marginTop: '1.5rem' }}>4. Security</h3>
        <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access.</p>
        
        <h3 style={{ marginTop: '1.5rem' }}>5. Contact Us</h3>
        <p>If you have any questions about this Privacy Policy, please contact us at info@adavakkad.com.</p>
      </div>
    )
  },
  'refund-policy': {
    title: 'Refund Policy',
    subtitle: 'Our commitment to customer satisfaction.',
    content: (
      <div className="card" style={{ padding: '2rem' }}>
        <h3>Return Policy</h3>
        <p>We accept returns within 7 days of delivery for unused, unworn items in their original packaging with tags attached.</p>
        
        <h3 style={{ marginTop: '1.5rem' }}>Refund Process</h3>
        <p>Once we receive your return, we will inspect it and notify you of the approval or rejection of your refund. If approved, your refund will be processed within 5-7 business days.</p>
        
        <h3 style={{ marginTop: '1.5rem' }}>Exchanges</h3>
        <p>We only replace items if they are defective or damaged. If you need to exchange it for the same item, please contact us.</p>
        
        <h3 style={{ marginTop: '1.5rem' }}>Non-Returnable Items</h3>
        <p>Certain items like customized clothing and intimate wear cannot be returned for hygiene reasons.</p>
      </div>
    )
  },
  'delivery-services': {
    title: 'Delivery Services',
    subtitle: 'Fast and reliable shipping across India.',
    content: (
      <div className="card" style={{ padding: '2rem' }}>
        <h3>Shipping Locations</h3>
        <p>We deliver to all major cities and towns across India. International shipping is currently not available.</p>
        
        <h3 style={{ marginTop: '1.5rem' }}>Delivery Times</h3>
        <p>Standard Delivery: 5-7 business days.<br/>Express Delivery: 2-3 business days (available in select locations).</p>
        
        <h3 style={{ marginTop: '1.5rem' }}>Shipping Charges</h3>
        <p>Free shipping on orders above ₹2000. standard shipping charge of ₹50 applies for orders below that amount.</p>
        
        <h3 style={{ marginTop: '1.5rem' }}>Tracking</h3>
        <p>Once your order is shipped, you will receive a tracking number via email/SMS to track your package.</p>
      </div>
    )
  },
  'promotions': {
    title: 'Current Promotions',
    subtitle: 'Exclusive deals and offers just for you.',
    content: (
      <div className="grid grid-2">
         <div className="card" style={{ padding: '2rem', borderLeft: '5px solid #F59E0B' }}>
           <h3>Wedding Season Sale</h3>
           <p>Get up to 20% off on all bridal collections. Valid until stocks last.</p>
           <Link href="/products" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Shop Now</Link>
         </div>
         
         <div className="card" style={{ padding: '2rem', borderLeft: '5px solid #1e40af' }}>
           <h3>First Order Discount</h3>
           <p>Use code <strong>WELCOME10</strong> to get 10% flat discount on your first purchase.</p>
           <Link href="/products" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Shop Now</Link>
         </div>
      </div>
    )
  }
};

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = policyContent[slug];

  if (!policy) {
    notFound();
  }

  return (
    <div className="container" style={{ paddingTop: '120px', minHeight: '60vh', paddingBottom: '60px' }}>
      <header className="section-header">
        <h1 className="section-title">{policy.title}</h1>
        <p className="section-subtitle">{policy.subtitle}</p>
      </header>
      
      {policy.content}
    </div>
  );
}
