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
import { Loading } from "../utils/Loading";
import { Error } from "../utils/Error";
import { useTheme } from "../CustomHooks/ThemeProvider";

export const Home = () => {
  const { theme } = useTheme();
  const [displayedCountries, setDisplayedCountries] = useState<CountryType[]>(
    [],
  );
  const [selectedRegion, setSelectedRegion] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);
  const [searchNotFound, setSearchNotFound] = useState(false);

  // fecth data based on user interaction
  const allCountriesQuery = useAllCountries();
  const regionFilterQuery = useFilterByRegion(selectedRegion);
  const searchQuery = useSearchCountries(debouncedSearch);

  // const isfetching = useIsFetching();

  useEffect(() => {
    if (debouncedSearch && searchQuery.data) {
      //reset search not found
      setSearchNotFound(false);

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

      // show search not found message if no results
      setSearchNotFound(sortedResults.length === 0 && debouncedSearch !== "");

      setDisplayedCountries(sortedResults);
    } else if (selectedRegion && regionFilterQuery.data) {
      setSearchNotFound(false);
      setDisplayedCountries(regionFilterQuery.data);
    } else if (allCountriesQuery.data) {
      setSearchNotFound(false);
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
    return <Loading height="min-h-[300px]" />;
  }

  if (allCountriesQuery.isError) {
    return <Error />;
  }

  // region options for dropdown
  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];

  const handleRegionSelect = (region: string) => {
    setSearch("");
    setSelectedRegion(region);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  return (
    <div
      className={`transition-colors duration-300 ${theme === "dark" ? "bg-DarkModeElements text-white" : "bg-LightModeBg text-LightModeText"}`}
    >
      {/* <div className="absolute left-0 right-0 top-0 bg-slate-500 p-6 font-bold tracking-wide text-white">
        <p>Query Function status: {allCountriesQuery.fetchStatus}</p>
        <p>Global fetching: {isfetching ? "fetching" : "idle"}</p>
      </div>  */}

      {searchNotFound && (
        <div
          className={`fixed left-0 right-0 top-0 z-50 animate-slide-down bg-red-500 p-4 text-white`}
        >
          No countries found matching "{debouncedSearch}"
        </div>
      )}

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
