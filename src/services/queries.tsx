import { useQuery } from "@tanstack/react-query";
import {
  filterByRegion,
  getCountriesData,
  getCountryByName,
  searchCountries,
} from "./api";

export const useAllCountries = (limit: number = 10) => {
  return useQuery({
    queryKey: ["countriesData", limit],
    queryFn: () => getCountriesData(limit),
  });
};

export const useCountryByName = (name: string) => {
  return useQuery({
    queryKey: ["country", name],
    queryFn: () => getCountryByName(name),
    enabled: !!name, //only run if the name is provided
  });
};

export const useFilterByRegion = (region: string) => {
  return useQuery({
    queryKey: ["country", region],
    queryFn: () => filterByRegion(region),
    enabled: !!region, //only run if region is provided
  });
};

export const useSearchCountries = (search: string) => {
  return useQuery({
    queryKey: ["country", search],
    queryFn: () => searchCountries(search),
    enabled: search.length > 0, //only run if the search has content
  });
};
