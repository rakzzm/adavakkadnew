import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Adavakkad Collections</h4>
            <p>
              4/425 I J 4/427<br />
              City Centre Complex<br />
              Thrikkadeeri, Kerala<br />
              India, 679502<br />
              Phone: +91 98476 72978<br />
              General: info@adavakkad.com
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/products">Products</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Policies</h4>
            <ul className="footer-links">
              <li><Link href="/policies/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/policies/refund-policy">Refund Policy</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
            <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
          </ul>
        </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2026 Advakkad. All rights reserved. Built with innovation and
            passion.
          </p>
        </div>
      </div>
    </footer>
  );
}
