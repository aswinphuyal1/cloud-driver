import Modilenavigation from "@/components/Modilenavigation";
import Sidebar from "@/components/Sidebar";
import React from "react";
import Header from "@/components/Header";
import { getcurrentuser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
export const dynamic='force-dynamic'

const layout = async ({ children }: { children: React.ReactNode }) => {
  const currentusser = await getcurrentuser();
  if(!currentusser) return redirect(('/sign-in'))
  return (
    <main className="flex h-screen">
      <Sidebar {...currentusser} />
      <section className="flex h-full flex-1 flex-col">
        <Modilenavigation  {...currentusser} />
        <Header userid={currentusser.$id} accountid={currentusser.accountid} />
        <div className="main-content">{children}</div>
      </section>
      <Toaster/>
    </main>
  );
};

export default layout;


