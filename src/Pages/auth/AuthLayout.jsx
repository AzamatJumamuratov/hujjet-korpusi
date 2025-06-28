import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="flex justify-center items-center min-h-screen p-3">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
