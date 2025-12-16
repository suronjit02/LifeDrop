const Loader = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-14 h-14 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-4 text-gray-600 font-medium tracking-wide">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loader;
