import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";

const links = [{ link: "account", title: "Аккаунт" }];

const SettingsSidebar = ({ ...props }) => {
  return (
    <Sidebar {...props}>
      <SidebarHeader className={"p-4"}>
        <h1 className="text-2xl font-semibold">Hújjet-Korpusı</h1>
      </SidebarHeader>
      <SidebarContent className={"flex justify-center"}>
        <SidebarMenu>
          {links.map((item, i) => {
            return (
              <SidebarMenuItem key={i}>
                <SidebarMenuButton className={"pl-8"}>
                  <NavLink to={item.link} className={"w-full"}>
                    {item.title}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default SettingsSidebar;
