export function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500 font-medium">
          Loading
        </div>
      </div>
    </div>
  );
}
