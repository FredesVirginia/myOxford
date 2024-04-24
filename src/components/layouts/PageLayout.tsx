import { Outlet } from "react-router";
import { Navbar } from "../partials/Navbar";

export const PageLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
