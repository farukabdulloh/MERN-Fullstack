const Loading = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 animate-spin" />
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="text-sm font-medium text-slate-600">Loading</p>
          <p className="text-xs text-slate-400 mt-1">Please wait a moment...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
