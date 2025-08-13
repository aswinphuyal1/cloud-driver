import Modilenavigation from "@/components/Modilenavigation";
import Sidebar from "@/components/Sidebar";
import React from "react";
import Header from "@/components/Header";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen">
      <Sidebar/>
      <section className="flex h-full flex-1 flex-col">
        <Modilenavigation/>
        <Header/>
        <div className="main-content">{children}</div>
      </section>
    </main>
  );
};

export default layout;
