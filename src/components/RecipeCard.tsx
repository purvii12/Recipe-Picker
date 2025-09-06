import { Heart, Clock, Users, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { ImageWithFallback } from "./img/ImageWithFallback";

export interface Recipe {
  id: string;
  title: string;
  image: string;
  readyTime: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  isFavorite: boolean;
  description: string;
  ingredients: string[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface RecipeCardProps {
  recipe: Recipe;
  onToggleFavorite: (id: string) => void;
  onViewDetails: (recipe: Recipe) => void;
}

export function RecipeCard({ recipe, onToggleFavorite, onViewDetails }: RecipeCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30";
      case "Medium": return "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30";
      case "Hard": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden bg-card border-border hover:border-[#6b46c1]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#6b46c1]/10 group">
        <div className="relative overflow-hidden">
          <ImageWithFallback
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleFavorite(recipe.id)}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-colors ${
              recipe.isFavorite 
                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" 
                : "bg-black/20 text-white hover:bg-black/40"
            }`}
          >
            <Heart 
              className={`w-4 h-4 ${recipe.isFavorite ? "fill-current" : ""}`} 
            />
          </Button>

          <div className="absolute bottom-3 left-3 flex gap-2">
            <Badge className={getDifficultyColor(recipe.difficulty)}>
              {recipe.difficulty}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-[#6b46c1] transition-colors">
              {recipe.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {recipe.description}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.readyTime}min</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {recipe.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-xs bg-muted/50 border-border"
              >
                {tag}
              </Badge>
            ))}
            {recipe.tags.length > 3 && (
              <Badge variant="outline" className="text-xs bg-muted/50 border-border">
                +{recipe.tags.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              onClick={() => onViewDetails(recipe)}
              className="flex-1 bg-[#6b46c1] hover:bg-[#6b46c1]/80 text-white"
              size="sm"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Recipe
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}