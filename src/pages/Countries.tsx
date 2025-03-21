import { useNavigate } from "react-router-dom";
import { CountryProps } from "../Types";
import { useTheme } from "../CustomHooks/ThemeProvider";

export const Countries = ({ country }: CountryProps) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleNavigation = (name: string) => {
    navigate(`country/${encodeURIComponent(name)}`);
  };

  return (
    <div>
      <div
        className={`mx-auto mb-12 h-fit w-[80%] rounded-md shadow-md transition-transform duration-300 hover:scale-105 hover:transform ${theme === "dark" ? "bg-DarkModeElements text-white" : "bg-white text-LightModeText"}`}
      >
        <div className="">
          <div
            className="cursor-pointer"
            onClick={() => handleNavigation(country?.name)}
          >
            <img
              className="h-52 w-full rounded-t-md bg-gray-200 object-cover"
              src={country?.flags.png || country?.flags.svg}
              loading="lazy"
              alt={`Flag of ${country?.name}`}
            />
          </div>
          <div className="p-9 pb-14">
            <h1 className="mb-5 truncate text-lg font-extrabold">
              {country?.name}
            </h1>
            <div className="space-y-2">
              <div className="flex flex-row items-center">
                <p className="text-md mr-2 font-semibold">Poulation:</p>
                <span> {country?.population.toLocaleString()}</span>
              </div>
              <div className="flex flex-row items-center">
                <p className="text-md mr-2 font-semibold">Capital:</p>
                <span> {country?.capital || "N/A"}</span>
              </div>
              <div className="flex flex-row items-center">
                <p className="text-md mr-2 font-semibold">Region:</p>
                <span>{country?.region}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
