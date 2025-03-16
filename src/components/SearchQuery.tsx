type SearchQueryProps = {
  search: string;
  handleSearch: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

export const SearchQuery = ({ search, handleSearch }: SearchQueryProps) => {
  return (
    <div>
      <input
        className="h-16 w-full p-6 shadow-lg"
        placeholder="Search for a country"
        type="text"
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
};
