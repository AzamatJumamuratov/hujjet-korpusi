// shared/ui/notification/NotificationProvider.jsx
import * as Toast from "@radix-ui/react-toast";
import { createContext, useContext, useState, useCallback } from "react";
import clsx from "clsx";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [toastData, setToastData] = useState({
    title: "",
    description: "",
    type: "default",
  });

  const notify = useCallback(({ title, description, type = "default" }) => {
    setToastData({ title, description, type });
    setOpen(false); // закрываем, если уже открыто
    setTimeout(() => setOpen(true), 10); // триггерим новое
  }, []);

  return (
    <NotificationContext.Provider value={{ notify }}>
      <Toast.Provider swipeDirection="right">
        {children}
        <Toast.Root
          className={clsx(
            "bg-white border shadow-xl rounded-md p-4 max-w-sm w-full flex flex-col gap-1 animate-in fade-in slide-in-from-top-5 duration-300 fixed top-4 right-4 z-[9999]",
            {
              "border-green-500": toastData.type === "success",
              "border-red-500": toastData.type === "error",
              "border-yellow-500": toastData.type === "warning",
            }
          )}
          open={open}
          onOpenChange={setOpen}
        >
          <Toast.Title className="font-semibold">{toastData.title}</Toast.Title>
          <Toast.Description className="text-sm text-gray-600">
            {toastData.description}
          </Toast.Description>
        </Toast.Root>
        <Toast.Viewport className="fixed top-4 right-4 z-[9999]" />
      </Toast.Provider>
    </NotificationContext.Provider>
  );
}

export const useNotification = () => {
  return useContext(NotificationContext);
};
