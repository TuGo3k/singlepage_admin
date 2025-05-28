import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Сайт Удирдлага',
  description: 'Вэб сайтын контент удирдлагын систем',
};

export default function RootLayout({ children }) {
  return (
    <html lang="mn" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen" style={{
            backgroundColor: `rgb(var(--background-rgb))`,
            color: `rgb(var(--foreground-rgb))`
          }}>
            <Sidebar />
            <main className="flex-1">
              <div className="p-4 flex justify-end">
                <ThemeToggle />
              </div>
              <div className="px-8 pb-8">
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
