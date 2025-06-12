import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import ClientLayout from '@/components/ClientLayout';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Вэбсайт Үүсгэгч - Website Builder',
  description: 'Монгол хэлний вэбсайт үүсгэх систем',
};

export default function RootLayout({ children }) {
  return (
    <html lang="mn" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
