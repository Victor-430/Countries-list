import { Outlet } from "react-router-dom";
import { ThemeToggle } from "../utils/ThemeToggle";

export const Navbar = () => {
  return (
    <div>
      <nav>
        <div className="flex-col-1 flex h-[6.5rem] items-center justify-between bg-white p-6 text-LightModeText shadow-lg">
          <h1 className="text-xl font-bold">Where in the World?</h1>
          {/* <button onClick={changeTheme}>
            <span className="flex-col-1 flex space-x-4">
              <i>X</i>
              <h2 className="text-lg font-semibold">Dark Mode</h2>
            </span>
          </button> */}
          <ThemeToggle />
        </div>
      </nav>
      <Outlet />
    </div>
  );
};
