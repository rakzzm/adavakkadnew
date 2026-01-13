'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { ProductProvider } from '@/context/ProductContext';
import { CustomerProvider } from '@/context/CustomerContext';
import { BuyerProvider } from '@/context/BuyerContext';
import { InvoiceProvider } from '@/context/InvoiceContext';
import { ChatProvider } from '@/context/ChatContext';
import { FAQProvider } from '@/context/FAQContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <CustomerProvider>
            <BuyerProvider>
              <InvoiceProvider>
                <ChatProvider>
                  <FAQProvider>
                    {children}
                  </FAQProvider>
                </ChatProvider>
              </InvoiceProvider>
            </BuyerProvider>
          </CustomerProvider>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}
