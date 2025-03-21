export const Error = () => {
  return (
    <div className="relative m-8 animate-slide-in rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
      <strong className="mr-2 font-bold">Error!</strong>
      <span className="block sm:inline">An error occurred loading data.</span>
    </div>
  );
};
