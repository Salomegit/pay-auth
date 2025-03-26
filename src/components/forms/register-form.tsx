"use client";
import React from 'react'
import { Form, FormField, FormLabel,  FormMessage, FormItem, FormControl } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link';

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
    <div >
        <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
      <div className='space-y-6'>
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="Enter your Username" type="text"{...field} />
            </FormControl>
            {/* <FormDescription>
              
            </FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Enter your Email" type="email"{...field} />
            </FormControl>
            {/* <FormDescription>
              
            </FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input placeholder="Enter your password" type="password" {...field} />
            </FormControl>
            {/* <FormDescription>
              This is your public display name.
            </FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Re-Enter Your Password</FormLabel>
            <FormControl>
              <Input placeholder="Re-Enter your password" type="password" {...field} />
            </FormControl>
            {/* <FormDescription>
              This is your public display name.
            </FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />
      </div>
      <Button className='w-full mt-6' type="submit">Register</Button>

    </form>
    <div className='mx-auto mt-4 flex w-full justify-evenly items-center before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
      or
    </div>
    <p className='text-center text-sm text-gray-600 mt-2'>
      If you have an account please&nbsp;
      <Link href='/login' className='text-blue-500 hover:underline'>Login</Link>
        
    </p>
  </Form>
  </div>
  )
}

export default RegisterForm