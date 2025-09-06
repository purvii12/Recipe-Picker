import { Heart } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  favoritesCount: number;
  onFavoritesClick: () => void;
}

export function Header({ favoritesCount, onFavoritesClick }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#10b981] to-[#6b46c1] flex items-center justify-center">
            <span className="text-white text-sm font-bold">🥬</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#10b981] to-[#6b46c1] bg-clip-text text-transparent">
            VeggieFinder
          </h1>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onFavoritesClick}
          className="relative hover:bg-[#6b46c1]/10 hover:border-[#6b46c1] transition-colors"
        >
          <Heart className="w-4 h-4 mr-2" />
          Favorites
          {favoritesCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#f59e0b] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
              {favoritesCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
}