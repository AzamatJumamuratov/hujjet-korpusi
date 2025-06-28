import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

import SettingsSidebar from "./SettingsSidebar";
import { NavLink, Outlet } from "react-router";
import { Button } from "@/components/ui/button";

const SettingsLayout = () => {
  return (
    <SidebarProvider>
      <SettingsSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky left-0 top-0 bg-white">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Button>
            <NavLink to={"/"}>В Главную</NavLink>
          </Button>
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-2xl font-semibold">Настройки</h1>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SettingsLayout;
