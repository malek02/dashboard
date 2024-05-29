"use client"

import { ModalProvider } from "@/context/ModalContext";
import { AppShell } from "@mantine/core";

const Layout = async ({ children }: Readonly<{
       children: React.ReactNode;
     }>) => {

  return (
    <ModalProvider>
      <AppShell className="p-10 flex flex-col gap-10">{children}</AppShell>
    </ModalProvider>
  );
};

export default Layout;
