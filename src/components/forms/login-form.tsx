"use client";
import React from 'react'
import { Form, FormField, FormLabel,  FormMessage, FormItem, FormControl } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link';
import GoogleSignInButton from '@/components/GoogleSignIn/GoogleSignInButton';

const FormSchema = z.object({
    email: z.string().min(1,"email is required").email("Invalid email"),
    password: z.string().min(1,"password is required").min(6,"Password must be more than 6 characters")
  })

const onSubmit = (data: z.infer<typeof FormSchema>) => {
  console.log(data)
}


const LoginForm = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
       resolver: zodResolver(FormSchema),

    })
  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 md:p-8">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 sm:space-y-6">
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your Email" 
                  type="email"
                  className="text-sm sm:text-base h-10 sm:h-12"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  className="text-sm sm:text-base h-10 sm:h-12"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />

        <Button 
          className="w-full mt-4 sm:mt-6 h-10 sm:h-12 text-sm sm:text-base"
          type="submit"
        >
          Login
        </Button>
      </form>

      {/* Divider */}
      <div className="mx-auto mt-4 sm:mt-6 flex w-full items-center before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        <span className="text-xs sm:text-sm text-gray-600">or</span>
      </div>

      {/* Google Button */}
        <GoogleSignInButton >
          Continue with google
        </GoogleSignInButton>
      
      {/* Registration Link */}
      <p className="text-center text-xs sm:text-sm text-gray-600 mt-4 sm:mt-6">
        If you don&apos;t have an account please&nbsp;
        <Link href='/register' className="text-blue-500 hover:underline text-sm sm:text-base">
          Register
        </Link>
      </p>
    </Form>
  </div>
  )
}

export default LoginForm