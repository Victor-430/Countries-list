import { CountryType } from "../Types";

export const BaseUrl = "http://localhost:3000";

export const endpoints = `${BaseUrl}/countries`;

// get all countries
export const getCountriesData = async (limit: number = 10) => {
  try {
    const res = await fetch(`${endpoints}?_limit=${limit}`);

    if (!res.ok) {
      throw new Error("An error occured Fetching Data");
    }

    const data: CountryType[] = await res.json();
    console.log(data);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error searching countries", err);
    }
    throw err;
  }
};

// get a single country by name - exact maatch
export const getCountryByName = async (name: string) => {
  try {
    const res = await fetch(`${endpoints}?name=${encodeURIComponent(name)}`);

    if (!res.ok) {
      throw new Error("An error occured Fetching Data");
    }

    const data: CountryType[] = await res.json();
    console.log(data);

    return data[0];
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error searching countries", err);
    }
    throw err;
  }
};

// filter country by region
export const filterByRegion = async (region: string) => {
  try {
    const res = await fetch(
      `${endpoints}?region=${encodeURIComponent(region)}`,
    );

    if (!res.ok) {
      throw new Error("An error occured Fetching Data");
    }

    const data: CountryType[] = await res.json();
    console.log(data);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error searching countries", err);
    }
    throw err;
  }
};

// search countries by name (partial match)
export const searchCountries = async (searchName: string) => {
  try {
    const res = await fetch(
      `${endpoints}?name_like=${encodeURIComponent(searchName)}`,
    );
    if (!res.ok) {
      throw new Error("An error occured searching countries");
    }
    const data: CountryType[] = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error searching countries", err);
    }
    throw err;
  }
};
