import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  creator: 'Veerbal Singh',
  title:
    'QuickClinic: Streamlined Healthcare Appointments & Patient Management',
  description:
    'Experience hassle-free healthcare with QuickClinic! Our innovative app simplifies doctor appointments using QR code technology, offering efficient patient management for doctors and easy access to healthcare for patients. Join QuickClinic for a seamless medical experience with quick appointment booking, real-time tokens, and comprehensive health record management. Elevate your healthcare journey today!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-w-screen-2xl mx-auto">
          <Toaster />
          {children}
        </div>
      </body>
    </html>
  );
}
