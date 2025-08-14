"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Flavors } from "next/font/google";
import { error } from "console";
import Link from "next/link";
import { kMaxLength } from "buffer";
import { createaccount } from "@/lib/actions/user.actions";
import Optmodel from "./Optmodel";
import { verifysecret } from "@/lib/actions/user.actions";

// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// });

type fromtype = "sign-in" | "sign-up";
const authFormschema = (formType: fromtype) => {
  return z.object({
    email: z.string().email(),
    fullName:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
  });
};


const AuthForm = ({ type }: { type: fromtype }) => {
  const formSchema = authFormschema(type);
  const [isloading, setisloading] = useState(false);
  const [errormessage, seterrormessage] = useState("");
  const [accountid, setaccountid] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setisloading(true);
    seterrormessage(" ");

    try {
      const user = await createaccount({
        fullName: values.fullName || "",
        email: values.email,
      });
      setaccountid(user.accountid);
    } catch (error) {
      seterrormessage("failed to create account");
    } finally {
      setisloading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">
            {type === "sign-in" ? "Sign-In" : "Sign Up"}
          </h1>
          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-lable">Username</FormLabel>

                    <FormControl>
                      <Input
                        className="shad-input"
                        placeholder="Enter your full name"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-lable">Email</FormLabel>

                  <FormControl>
                    <Input
                      className="shad-input"
                      placeholder="Enter your Email"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />

          <Button
            className="form-submit-button "
            type="submit"
            disabled={isloading}
          >
            {type === "sign-in" ? "SIGN IN " : "SIGN UP"}

            {isloading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>
          {errormessage && <p className="error-message">{errormessage}</p>}
          <div className="body-2 flex justify-center">
            <p className="body-2 flex justify-center">
              {type == "sign-in"
                ? "You dont have an account!"
                : "Already have an account?"}
            </p>
            <Link
              className="ml-1 font-medium text-brand"
              href={type == "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {""}
              {type === "sign-in" ? "sign up" : "sign in"}
            </Link>
          </div>
        </form>
      </Form>
      {accountid && (
        <Optmodel email={form.getValues("email")} accountid={accountid} />
      )}
    </>
  );
};

export default AuthForm;
