// import './globals.css';
// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Friend Fries - ระบบเฟรนด์ฟรายและความสวงตัว',
//   description: 'แอพสำหรับร้านอาหารประเภทเฟรนช์ฟราย',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="th">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }
import './globals.css'
import { OrderProvider } from '@/context/OrderContext'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <OrderProvider>
          {children}
        </OrderProvider>
      </body>
    </html>
  );
}
