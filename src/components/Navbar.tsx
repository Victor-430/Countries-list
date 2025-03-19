import { Outlet } from "react-router-dom";
import { ThemeToggle } from "../utils/ThemeToggle";
import { useTheme } from "../CustomHooks/ThemeProvider";

export const Navbar = () => {
  const { theme } = useTheme();
  return (
    <div
      className={
        theme === "dark"
          ? "bg-DarkModeBg text-white"
          : "bg-LightModeBg text-LightModeText"
      }
    >
      <nav>
        <div
          className={`flex-col-1 flex h-[6.5rem] items-center justify-between bg-white p-6 ${theme === "dark" ? "bg-DarkModeElements text-white" : "bg-LightModeBg text-LightModeText"} shadow-lg`}
        >
          <h1 className="text-xl font-bold">Where in the World?</h1>
          <ThemeToggle />
        </div>
      </nav>
      <Outlet />
    </div>
  );
};
