import type { Metadata } from 'next';
import './globals.css';
import { Inter, Playfair_Display, Outfit } from "next/font/google";
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import LayoutWrapper from '@/components/LayoutWrapper';
import { CustomerProvider } from '@/context/CustomerContext';

// ... (imports remain same)

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
      <body className={`${inter.variable} ${playfair.variable} ${outfit.variable}`}>
        <AuthProvider>
          <CartProvider>
            <ProductProvider>
              <CustomerProvider>
                <LayoutWrapper>
                  {children}
                </LayoutWrapper>
              </CustomerProvider>
            </ProductProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
