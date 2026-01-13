import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import Chatbot from '@/components/Chatbot';

export const metadata: Metadata = {
  title: 'Adavakkad Collections Wedding Center',
  description: 'Premium digital solutions and quality clothing for modern businesses and families.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      </head>
      <body>
        <CartProvider>
          <Navbar />
          <Sidebar />
          <CartDrawer />
          {children}
          <Footer />
          <Chatbot />
        </CartProvider>
      </body>
    </html>
  );
}
