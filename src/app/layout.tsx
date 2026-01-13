import type { Metadata } from 'next';
import './globals.css';
import { Inter, Playfair_Display, Outfit } from "next/font/google";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import Chatbot from '@/components/Chatbot';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });

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
      <body className={`${inter.variable} ${playfair.variable} ${outfit.variable}`}>
        <AuthProvider>
          <Navbar />
          <Sidebar />
          {children}
          <Footer />
          <Chatbot />
        </AuthProvider>
      </body>
    </html>
  );
}
