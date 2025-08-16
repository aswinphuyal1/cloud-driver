"use client"
import React from 'react'
import Image from 'next/image';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
const Modilenavigation = () => {
  const [open, setopen] = useState(false)
  return (
    <header className='mobile-header'>
      <Image
        src="/assets/icons/logo-full-brand.svg"
        alt="logo"
        width={120}
        height={52}
        className="h-auto"
      />
      <Sheet open={open} onOpenChange={setopen}>
        <SheetTrigger>
          <Image src="/assets/icons/menu.svg" alt=''width={30} height={30}/>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
}

export default Modilenavigation