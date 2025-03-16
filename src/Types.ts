interface Flags {
  svg: string;
  png: string;
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface Languages {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

interface RegionalBlocs {
  acronym: string;
  name: string;
}

interface Translatiions {
  br: string;
  pt: string;
  nl: string;
  hr: string;
  fa: string;
  de: string;
  es: string;
  fr: string;
  ja: string;
  it: string;
  hu: string;
}

export interface CountryType {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  subregion: string;
  region: string;
  population: number;
  latlng: number[];
  demonym: string;
  area: number;
  timezones: number[];
  borders: string[];
  nativeName: string;
  numericCode: number;
  flags: Flags;
  currencies: Currency[];
  languages: Languages[];
  translations: Translatiions;
  flag: string;
  regionalBlocs: RegionalBlocs[];
  cioc: string;
  independent: boolean;
}

export interface CountryProps {
  country: CountryType;
}

export interface DropdownProps {
  options: string[];
  defaultText: string;
  onSelect: (option: string) => void;
}
