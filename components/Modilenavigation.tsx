"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { navItems } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Fileuploader from "./Fileuploader";
import { Signoutuser } from "@/lib/actions/user.actions";
interface Props {
  fullName: string;
  avatar: string;
  email: string;
  ownerId:string,
  accountId:string
}
const Modilenavigation = ({
  ownerId,
  accountId,
  fullName,
  avatar,
  email,
}: Props) => {
  const [open, setopen] = useState(false);
   const pathname = usePathname();
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
          <Image
            src="/assets/icons/menu.svg"
            alt="Open navigation menu"
            width={30}
            height={30}
          />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetHeader>
            <div className="header-user">
              <Image
                src={avatar}
                height={44}
                width={44}
                alt="avatar"
                className="header-user-avatar"
              />
              <div className="lg:hidden">
                <p className="subtitle-2 capitalize">{fullName}</p>
                <p className="caption">{email}</p>
              </div>
            </div>
          </SheetHeader>
          <Separator className="my-4" />
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map(({ url, name, icon }) => (
                <Link key={name} href={url} className="lg:w-full">
                  <li
                    className={cn(
                      "mobile-nav-item",
                      pathname === url && "shad-active"
                    )}
                  >
                    <Image
                      src={icon}
                      alt={name}
                      width={24}
                      height={24}
                      className={cn(
                        "nav-icon",
                        pathname === url && "nav-icon-active"
                      )}
                    />
                    <p className="text-base font-medium">{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
          <Separator className="my-5 bg-light-200/20" />
          <div className="flex flex-col justify-between gap-5 pb-5">
            <Fileuploader/>
          </div>
          <form>
            <Button type="submit" className="mobile-sign-out-button" onClick={async()=>
              {
await Signoutuser()
              }
            }>
              <Image
                src="/assets/icons/logout.svg"
                alt="logo"
                width={24}
                height={24}
                
              />
              <p>Logout</p>
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Modilenavigation;
