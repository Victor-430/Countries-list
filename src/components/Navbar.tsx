import { Outlet } from "react-router-dom";
import { ThemeToggle } from "../utils/ThemeToggle";

export const Navbar = () => {
  return (
    <div>
      <nav>
        <div className="flex-col-1 flex h-[6.5rem] items-center justify-between bg-white p-6 text-LightModeText shadow-lg">
          <h1 className="text-xl font-bold">Where in the World?</h1>
          <ThemeToggle />
        </div>
      </nav>
      <Outlet />
    </div>
  );
};
