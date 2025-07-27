export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-muted border-t-primary animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-t-accent animate-spin animate-reverse"></div>
      </div>
    </div>
  );
};