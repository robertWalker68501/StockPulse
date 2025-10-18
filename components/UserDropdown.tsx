'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import NavItems from '@/components/NavItems';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const UserDropdown = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    router.push('/sign-in');
  };

  const user = { name: 'John', email: 'john@example.com' };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex items-center gap-3 text-gray-400 hover:text-yellow-500'
        >
          <Avatar className='size-8'>
            <AvatarImage src='https://avatars.githubusercontent.com/u/89893564?v=4' />
            <AvatarFallback className='bg-yellow-500 text-sm font-bold text-yellow-900'>
              {user.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className='hidden flex-col items-start md:flex'>
            <span className='text-base font-medium text-gray-400'>
              {user.name}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='text-gray-400'>
        <DropdownMenuLabel>
          <div className='relative flex items-center gap-3 py-2'>
            <Avatar className='size-10'>
              <AvatarImage src='https://avatars.githubusercontent.com/u/89893564?v=4' />
              <AvatarFallback className='bg-yellow-500 text-sm font-bold text-yellow-900'>
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <span className='text-base font-medium text-gray-400'>
                {user.name}
              </span>
              <span className='text-sm text-gray-500'>{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className='bg-gray-600 sm:block' />
        <nav className='sm:hidden'>
          <NavItems />
        </nav>
        <DropdownMenuSeparator className='block bg-gray-600 sm:hidden' />
        <DropdownMenuItem
          onClick={handleSignOut}
          className='text-md cursor-pointer font-medium text-gray-100 transition-colors focus:bg-transparent focus:text-yellow-500'
        >
          <LogOut className='mr-2 hidden size-4 sm:block' />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
