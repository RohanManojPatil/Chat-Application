"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button'
import Image from 'next/image';  
import {signIn} from 'next-auth/react'
  
export const LoginModal = () => {

  const handleLogin = () => {
    signIn("google", {
      callbackUrl : "/dashboard",
      redirect : true,
    })
  }
  return (
<Dialog>
  <DialogTrigger asChild>
    <Button>Getting Start</Button>
  </DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>Welcome to Quick Chat</DialogTitle>
        <DialogDescription>
            Quick Chat makes it effortless to create secure chat links and start conversation in seconds.
        </DialogDescription>
        </DialogHeader>
        <Button variant="outline" onClick={handleLogin}>
            <Image src="/images/google.png"
                   className='mr-4'
                   width={25}
                   height={25}
                   alt='google_logo'></Image>
                   Continue with Google
        </Button>
    </DialogContent>
</Dialog>
  )
}
