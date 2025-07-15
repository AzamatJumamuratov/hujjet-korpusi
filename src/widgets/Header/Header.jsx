import { Link, useLoaderData } from "react-router";
import user_icon from "@/assets/user_icon.svg";
import settings_icon from "@/assets/settings_icon.svg";
import logout_icon from "@/assets/logout_icon.svg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const loaderData = useLoaderData();
  return (
    <header className="flex justify-evenly p-3 z-10 sticky left-0 top-0 bg-white shadow-md">
      <h1 className="text-xl font-semibold">Hújjet-Korpusı</h1>
      <DropdownMenu>
        <DropdownMenuTrigger className={"rounded-full bg-slate-700 p-2"}>
          <img src={user_icon} className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Аккаунт</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>{loaderData.profile.username}</DropdownMenuLabel>
          <Link to={"/settings"} className="">
            <DropdownMenuItem className={"flex items-center"}>
              <img src={settings_icon} className="size-4" />
              Настройки
            </DropdownMenuItem>
          </Link>
          <Link to={"/auth/logout"} className="">
            <DropdownMenuItem className={"flex items-center"}>
              <img src={logout_icon} className="size-4" />
              Выйти
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
