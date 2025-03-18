import { useNavigate, useParams } from "react-router-dom";
import { useCountryByName } from "../api/queries";

export const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const navigate = useNavigate();

  const countryQuery = useCountryByName(id || "");
  console.log(countryQuery);

  if (countryQuery.isPending) {
    return <div>Loading .....</div>;
  }

  if (countryQuery.isError) {
    return <div>An error occured loading Data</div>;
  }

  const handleNavigation = () => {
    navigate("/");
  };

  const country = countryQuery.data;

  return (
    <div className="mx-8 lg:mx-16">
      <button
        onClick={handleNavigation}
        className="lg:mb-18 mb-24 mt-12 flex items-center rounded-sm bg-white px-16 py-2.5 shadow-lg transition-transform duration-300 hover:scale-105 hover:transform lg:mt-16"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        Back
      </button>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16">
        <div className="transition-transform duration-300 hover:scale-105 hover:transform">
          <img
            className="h-64 w-full rounded-md bg-gray-200 shadow-lg md:w-[90%]"
            src={country?.flags.svg || country.flags?.png}
            alt={`Flag of ${country.name}`}
          />
        </div>

        <div className="space-y-8">
          <h1 className="text-3xl font-extrabold">{country?.name}</h1>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-12">
            <div className="space-y-3">
              <p>
                <span className="mr-1 font-semibold">Native Name:</span>
                {country.nativeName}
              </p>
              <p>
                <span className="mr-1 font-semibold">Population:</span>
                {country?.population.toLocaleString()}
              </p>
              <p>
                <span className="mr-1 font-semibold">Region:</span>
                {country?.region}
              </p>
              <p>
                <span className="mr-1 font-semibold">Sub Region:</span>
                {country?.subregion}
              </p>
              <p>
                <span className="mr-1 font-semibold">Capital:</span>
                {country?.capital}
              </p>
            </div>

            <div className="spayce-y-3">
              <p>
                <span className="mr-1 font-semibold">Top Level Domain:</span>
                {country.topLevelDomain?.join(", ")}
              </p>
              <p>
                <span className="mr-1 font-semibold">Currencies:</span>
                {country.currencies?.map((c) => `${c.name} (${c.symbol})`)}
              </p>
              <p>
                <span className="mr-1 font-semibold">Languages:</span>
                {country.languages?.map((l) => `${l.name}`).join(", ")}
              </p>
            </div>

            <div>
              <h1 className="mb-8 font-semibold">Border Countries:</h1>
              <div className="grid grid-cols-3 gap-6 md:grid-cols-4">
                {country.borders?.map((country) => (
                  <div
                    key={country}
                    className="rounded-md px-8 py-2.5 shadow-md transition-transform duration-300 hover:scale-110 hover:transform"
                  >
                    {country}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
