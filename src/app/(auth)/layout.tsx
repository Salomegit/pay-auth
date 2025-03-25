import React from 'react'
import { ReactNode } from 'react';

interface AuthLayoutProps {
    children:ReactNode
}
const Authlayout = ({children}:AuthLayoutProps) => {
  return (
    <div className='bg-amber-400 p-10 rounded-md'>{children}</div>
  )
}

export default Authlayout