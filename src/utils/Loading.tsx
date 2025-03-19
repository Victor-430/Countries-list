export const Loading = ({ height = "min-h-screen" }) => {
  return (
    <div className={`flex ${height} items-center justify-center`}>
      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
    </div>
  );
};
