import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'PORTFOLIO', path: '/portfolio' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#4a0404]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-serif text-white flex items-center gap-2">
          <span className="text-yellow-400">你好！</span>
          <span className="text-sm opacity-80">🍀 〜(ㅇwㅇ)〜</span>
        </Link>
        
        <div className="flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={twMerge(
                clsx(
                  "text-sm font-medium tracking-widest transition-colors",
                  location.pathname === item.path ? "text-yellow-400" : "text-white/70 hover:text-white"
                )
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
