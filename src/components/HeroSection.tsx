import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const HeroSection = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg bg-muted animate-pulse" />
    );
  }

  const lightImage = "/lovable-uploads/bcf3def0-664f-403a-811a-95d6572b6ccc.png";
  const darkImage = "/lovable-uploads/6a80378c-b7f8-4078-a476-f4be6802dcc8.png";

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg bg-card shadow-card">
      {/* Light mode image */}
      <img
        src={lightImage}
        alt="Modern workspace with laptop and devices"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          theme === 'dark' ? 'opacity-0' : 'opacity-100'
        }`}
      />
      
      {/* Dark mode image */}
      <img
        src={darkImage}
        alt="Black headphones on dark surface"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          theme === 'dark' ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* Overlay content */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/20 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              StoreGallery
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              اكتشف مجموعة رائعة من المنتجات المختارة بعناية، من الإلكترونيات إلى الأزياء والمجوهرات
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                تسوق الآن
              </button>
              <button className="px-8 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-accent transition-colors">
                اعرف أكثر
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};