import Modilenavigation from "@/components/Modilenavigation";
import Sidebar from "@/components/Sidebar";
import React from "react";
import Header from "@/components/Header";
import { getcurrentuser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
const layout = async ({ children }: { children: React.ReactNode }) => {
  const currentusser = await getcurrentuser();
  if(!currentusser) return redirect(('/sign-in'))
  return (
    <main className="flex h-screen">
      <Sidebar {...currentusser} />
      <section className="flex h-full flex-1 flex-col">
        <Modilenavigation />
        <Header />
        <div className="main-content">{children}</div>
      </section>
    </main>
  );
};

export default layout;
