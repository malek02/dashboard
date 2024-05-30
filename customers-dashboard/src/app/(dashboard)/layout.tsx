"use client"

import { ModalProvider } from "@/context/ModalContext";

const Layout = async ({ children }: Readonly<{
       children: React.ReactNode;
     }>) => {

  return (
    <ModalProvider>
      <div className="p-10 flex flex-col gap-10">{children}</div>
    </ModalProvider>
  );
};

export default Layout;
