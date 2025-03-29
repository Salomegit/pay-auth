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
    username: z.string().min(1,"username is required").max(10),

    email: z.string().min(1,"email is required").email("Invalid email"),
    password: z.string().min(1,"password is required").min(6,"Password must be more than 6 characters"),
    confirmPassword: z.string().min(1,"password confirmation is required").min(6,"Password must be more than 6 characters")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match", path: ["confirmPassword"]});

const onSubmit = (data: z.infer<typeof FormSchema>) => {
  console.log(data)
}


const RegisterForm = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
       resolver: zodResolver(FormSchema),
       defaultValues: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
       }

    })
  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 md:space-y-6">
          {/* Username Field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-sm md:text-base">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your Username"
                    className="text-sm md:text-base h-10 md:h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs md:text-sm" />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1 mt-4 md:mt-0">
                <FormLabel className="text-sm md:text-base">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your Email"
                    type="email"
                    className="text-sm md:text-base h-10 md:h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs md:text-sm" />
              </FormItem>
            )}
          />
        

        {/* Password Fields */}
        <div className="space-y-4 md:space-y-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm md:text-base">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    className="text-sm md:text-base h-10 md:h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs md:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm md:text-base">Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Re-Enter your password"
                    type="password"
                    className="text-sm md:text-base h-10 md:h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs md:text-sm" />
              </FormItem>
            )}
          />
        </div>

        <Button 
          className="w-full mt-4 md:mt-6 h-12 md:h-14 text-sm md:text-base"
          type="submit"
        >
          Create Account
        </Button>
      </form>

      {/* Divider */}
      <div className="mx-auto mt-6 md:mt-8 flex w-full items-center before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        <span className="text-xs md:text-sm text-gray-600">or</span>
      </div>

      {/* Google Button */}
      <div className='w-full mt-4 md:mt-6 h-12 md:h-14 text-sm md:text-base'>

        <GoogleSignInButton >
           Continue with Google
            </GoogleSignInButton>
      </div>

      {/* Login Link */}
      <p className="text-center text-xs md:text-sm text-gray-600 mt-6 md:mt-8">
        Already have an account? {' '}
        <Link href="/login" className="text-blue-500 hover:underline font-medium">
          Sign In
        </Link>
      </p>
    </Form>
  </div>
  )
}

export default RegisterForm