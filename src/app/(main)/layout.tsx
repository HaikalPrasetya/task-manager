import MobileMenu from "@/components/home/MobileMenu";
import Sidebar from "@/components/Sidebar/Sidebar";
import { MobileSidebarProvider } from "@/context/MobileSidebar";
import { Suspense } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex">
      <MobileSidebarProvider>
        <Sidebar />
        <div className="p-10 flex flex-col gap-3 w-full">
          <MobileMenu />
          <Suspense fallback="Loading">{children}</Suspense>
        </div>
      </MobileSidebarProvider>
    </section>
  );
}
