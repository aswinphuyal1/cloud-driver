"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Span } from "next/dist/trace";
import { Button } from "./ui/button";
import { verifysecret } from "@/lib/actions/user.actions";
import { sendemailotp } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
const Optmodel = ({
  accountid,
  email,
}: {
  accountid: string;
  email: string;
}) => {
  const router = useRouter();
  const [isOpen, setisOpen] = useState(true);
  const [password, setpassword] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setisLoading(true);
    try {
      //CALL API TO VERIFY API
      const sessionid = await verifysecret({ accountid, password });
      if (sessionid) {
        router.push("/");
      }
    } catch (error) {
      console.log("Action failed");
    }

    setisLoading(false);
  };

  const handelresendingotp = async () => {
    //calll api to resend
    await sendemailotp({ email });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setisOpen}>
      {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="h2 text-center">
            Enter your OTP
            <Image
              src="/assets/icons/close-dark.svg"
              alt="close"
              width={20}
              height={20}
              onClick={() => setisOpen(false)}
              className="otp-close-button"
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="subtitle-2 text-center text-light-100">
            Check your email at
            <span className="pl-1 text-brand ">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <InputOTP maxLength={6} value={password} onChange={setpassword}>
          <InputOTPGroup className="shad-otp">
            <InputOTPSlot index={0} className="shad-otp-slot" />
            <InputOTPSlot index={1} className="shad-otp-slot" />
            <InputOTPSlot index={2} className="shad-otp-slot" />
            <InputOTPSlot index={3} className="shad-otp-slot" />
            <InputOTPSlot index={4} className="shad-otp-slot" />
            <InputOTPSlot index={5} className="shad-otp-slot" />
          </InputOTPGroup>
          
        </InputOTP>

        <AlertDialogFooter>
          <div className="flex w-full flex-col gap-4">
            <AlertDialogAction
              onClick={handleSubmit}
              className="shad-submit-btn h-12"
              type="button"
            >
              Continue
              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="ml-2 animate-spin"
                />
              )}
            </AlertDialogAction>
            <div className="submit-2 mt-2 text-center">
              Didnt get a code?
              <Button
                type="button"
                variant="link"
                className="pl-1 text-brand  "
                onClick={() => handelresendingotp()}
              >
                Click to resend
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Optmodel;
