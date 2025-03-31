import React from 'react'
import { ReactNode } from 'react'

interface AuthLayoutProps {
    children: ReactNode
}

const Authlayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="bg-amber-400/90 p-4 sm:p-6 md:p-8 lg:p-10 mt-10  
               rounded-md md:rounded-lg lg:rounded-xl 
               shadow-sm md:shadow-lg
               w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg 
               mx-auto
               transition-all duration-300">
      {children}
    </div>
  )
}

export default Authlayout