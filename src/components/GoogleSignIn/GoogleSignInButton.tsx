import react from 'react'
import {FC} from 'react';
import { Button } from '../ui/button';

interface GoogleSignInButtonProps {
    children:react.ReactNode;
}
const GoogleSignInButton:FC<GoogleSignInButtonProps> = ({children}) => {

    const loginWithGoogle = () => {
        console.log("login with google")
    }

  return (
    <div>
        <Button   className='w-full mt-4 md:mt-6 h-12 md:h-14 text-sm md:text-base' onClick={loginWithGoogle}>{children}</Button>
    </div>
  )
}

export default GoogleSignInButton