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
        <Button className="w-full mt-4 sm:mt-6 h-10 sm:h-12 text-sm sm:text-base" onClick={loginWithGoogle}>{children}</Button>
    </div>
  )
}

export default GoogleSignInButton