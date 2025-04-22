const Preloader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
      <div className="w-12 h-12 border-4 border-t-primary border-gray-300 rounded-full animate-spin" />
    </div>
  );
};

export default Preloader;
