import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'
import { HandMetal } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className='bg-zinc-100 py-2 md:py-3 border-b border-s-zinc-200 fixed w-full z-50 top-0'>
      <div className=' mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-12 md:h-14'>
          {/* Logo Section */}
          <Link href='/' className='flex items-center gap-2'>
            <HandMetal className='h-6 w-6 md:h-8 md:w-8' />
            <span className='hidden md:inline-block text-lg font-semibold'>
              Your Brand
            </span>
          </Link>

          {/* Navigation Items */}
          <div className='flex items-center gap-4'>
            <Link 
              href='/login' 
              className={buttonVariants({
                size: 'sm',
                className: 'text-sm md:text-base px-4 md:px-6'
              })}
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar