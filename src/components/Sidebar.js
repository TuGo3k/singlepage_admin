'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import sidebardata from '@/data/apiData';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 bg-white shadow-lg fixed left-0 top-0">
      {/* Logo Section */}
      <div className="p-4 border-b">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
          <span className="font-semibold text-xl">Admin</span>
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="mt-6">
        {sidebardata.map((item) => {
          const isActive = pathname === item.link;
          return (
            <Link
              key={item.title}
              href={item.link}
              className={`flex items-center px-6 py-3 text-gray-700 transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' 
                  : 'hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <span className={`mr-3 ${isActive ? 'text-blue-600' : ''}`}>
                {item.icon}
              </span>
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar; 