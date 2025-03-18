// import { useIsFetching } from "@tanstack/react-query";

import {
  useAllCountries,
  useFilterByRegion,
  useSearchCountries,
} from "../api/queries";

import { Countries } from "../pages/Countries";
import { useEffect, useState } from "react";
import { CountryType } from "../Types";
import { Dropdown } from "../utils/Dropdown";
import { SearchQuery } from "./SearchQuery";
import { useDebounce } from "use-debounce";

export const Home = () => {
  const [displayedCountries, setDisplayedCountries] = useState<CountryType[]>(
    [],
  );
  const [selectedRegion, setSelectedRegion] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  // fecth data based on user interaction
  const allCountriesQuery = useAllCountries();
  const regionFilterQuery = useFilterByRegion(selectedRegion);
  const searchQuery = useSearchCountries(debouncedSearch);

  // const isfetching = useIsFetching();

  useEffect(() => {
    if (debouncedSearch && searchQuery.data) {
      // Sort results to prioritize exact matches
      const sortedResults = [...searchQuery.data].sort((a, b) => {
        // Exact match first
        if (a.name.toLowerCase() === debouncedSearch.toLowerCase()) return -1;
        if (b.name.toLowerCase() === debouncedSearch.toLowerCase()) return 1;

        // Then starts with
        if (a.name.toLowerCase().startsWith(debouncedSearch.toLowerCase()))
          return -1;
        if (b.name.toLowerCase().startsWith(debouncedSearch.toLowerCase()))
          return 1;

        // Alphabetical order for the rest
        return a.name.localeCompare(b.name);
      });

      setDisplayedCountries(sortedResults);
    } else if (selectedRegion && regionFilterQuery.data) {
      setDisplayedCountries(regionFilterQuery.data);
    } else if (allCountriesQuery.data) {
      setDisplayedCountries(allCountriesQuery.data);
    }
  }, [
    debouncedSearch,
    selectedRegion,
    searchQuery.data,
    regionFilterQuery.data,
    allCountriesQuery.data,
  ]);

  const isLoading =
    allCountriesQuery.isPending ||
    (selectedRegion && regionFilterQuery.isPending) ||
    (debouncedSearch && searchQuery.isPending);

  if (isLoading) {
    return <div>Loading ......</div>;
  }

  if (allCountriesQuery.isError) {
    return <div>An error occured fetching data</div>;
  }

  // if (!debouncedSearch) {
  //   return (
  //     <div className="z-99 absolute left-0 right-0 top-0 bg-yellow-300 text-white">
  //       Search not found
  //     </div>
  //   );
  // }

  // region options for dropdown
  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  return (
    <div className="">
      {/* <div className="absolute left-0 right-0 top-0 bg-slate-500 p-6 font-bold tracking-wide text-white">
        <p>Query Function status: {allCountriesQuery.fetchStatus}</p>
        <p>Global fetching: {isfetching ? "fetching" : "idle"}</p>
      </div> */}

      <div className="m-6 mb-12 flex flex-col gap-10">
        <SearchQuery search={search} handleSearch={handleSearch} />

        <div className="w-1/2 shadow-md">
          <Dropdown
            options={regions}
            defaultText="Filter by Region"
            onSelect={handleRegionSelect}
          />
        </div>
      </div>

      <div className="mx-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {displayedCountries?.map((country) => (
          <Countries key={country.name} country={country} />
        ))}
      </div>
    </div>
  );
};
