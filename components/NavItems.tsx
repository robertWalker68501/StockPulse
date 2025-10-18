'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAV_ITEMS } from '@/lib/constants';

const NavItems = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';

    return pathname === path || pathname.startsWith(path + '/');
  };

  return (
    <ul className='flex flex-col gap-3 p-2 font-medium sm:flex-row sm:gap-10'>
      {NAV_ITEMS.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            className={`transition-colors hover:text-yellow-500 ${isActive(href) ? 'text-gray-100' : ''}`}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavItems;
