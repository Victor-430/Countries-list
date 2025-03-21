import { useTheme } from "../CustomHooks/ThemeProvider";

export const Loading = ({ height = "min-h-screen" }) => {
  const { theme } = useTheme();

  return (
    <div className={`flex ${height} items-center justify-center`}>
      <div
        className={`h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 ${theme === "dark" ? "border-white" : "border-gray-900"}`}
      ></div>
    </div>
  );
};
