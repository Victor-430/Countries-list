import { Outlet } from "react-router-dom";
import { ThemeToggle } from "../utils/ThemeToggle";
import { useTheme } from "../CustomHooks/ThemeProvider";

export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <nav>
      <div
        className={`flex-col-1 flex h-[6.5rem] items-center justify-between p-6 lg:px-16 ${theme === "dark" ? "bg-DarkModeElements text-white" : "bg-white text-LightModeText"} shadow-lg`}
      >
        <h1 className="text-xl font-bold">Where in the World?</h1>
        <ThemeToggle />
      </div>
      <Outlet />
    </nav>
  );
};
