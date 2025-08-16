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
import { string } from 'zod';
interface Props
{
  ownerId:string
  ,accountId:string
  ,fullName:string
  ,avatar:string
  ,email:string
}
const Modilenavigation = ({ownerId,accountId,fullName,avatar,email}:Props) => {
  const [open, setopen] = useState(false)
  return (
    <header className="mobile-header">
      <Image
        src="/assets/icons/logo-full-brand.svg"
        alt="logo"
        width={120}
        height={52}
        className="h-auto"
      />
      <Sheet open={open} onOpenChange={setopen}>
        <SheetTrigger>
          <Image src="/assets/icons/menu.svg" alt="" width={30} height={30} />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetTitle>
            <div className="header-user">
              <Image
                src={avatar}
                height={44}
                width={44}
                alt="avatar"
                className="header-user-avatar"
              />
              <div className='sm:hidden lg:block' >
<p className='subtitle-2 capitalize'>{fullName}</p>
<p className='caption'>{email}</p>

              </div>
            </div>
          </SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </header>
  );
}

export default Modilenavigation


