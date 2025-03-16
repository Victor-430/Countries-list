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
    <div>
      <button
        onClick={handleNavigation}
        className="mx-6 mb-24 mt-12 rounded-md bg-white px-12 py-4 shadow-md"
      >
        Back
      </button>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div>
          <img
            className="h-auto w-full rounded-md bg-gray-200 shadow-lg"
            src={country?.flags.svg || country.flags?.png}
            alt={`Flag of ${country.name}`}
          />
        </div>

        <div className="space-y-8">
          <h1 className="text-3xl font-extrabold">{country?.name}</h1>

          <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            <div>
              <p>
                <span className="font-semibold">Native Name:</span>
                {country.nativeName}
              </p>
              <p>
                <span className="font-semibold">Population:</span>
                {country?.population.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {country?.region}
              </p>
              <p>
                <span className="font-semibold">Sub Region:</span>
                {country?.subregion}
              </p>
              <p>
                <span className="font-semibold">Capital:</span>{" "}
                {country?.capital}
              </p>
            </div>

            <div>
              <p>
                <span className="font-semibold">Top Level Domain:</span>
                {country.topLevelDomain?.join(", ")}
              </p>
              {/* <p>
                <span className="font-semibold">Currencies:</span>{' '}
                {country.currencies?.map(c => `${c.name} (${c.symbol})`
                </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
