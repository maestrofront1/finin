import './globals.css';
import type { Metadata } from 'next';
import { defaultMetadata } from '@shared/seo/metadata';
import { Inter } from 'next/font/google';
import Header from '@shared/ui/Header';
import "../public/fonts/Gilroy/gilroy.css"
import Footer from '@shared/ui/Footer';


export const metadata: Metadata = defaultMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen flex flex-col !font-sans">
        <Header />
        <main className="mt-6">{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
