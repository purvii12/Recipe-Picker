import { X, Clock, Users, Heart } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Recipe } from "./RecipeCard";
import { ImageWithFallback } from "./img/ImageWithFallback";

interface RecipeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
}

export function RecipeModal({ recipe, isOpen, onClose, onToggleFavorite }: RecipeModalProps) {
  if (!recipe) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30";
      case "Medium":
        return "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30";
      case "Hard":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 flex flex-col bg-card border-border">
        {/* Header with image and action buttons */}
        <div className="relative h-64 flex-shrink-0">
          <ImageWithFallback
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm"
          >
            <X className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleFavorite(recipe.id)}
            className={`absolute top-4 right-16 p-2 rounded-full backdrop-blur-sm transition-colors ${
              recipe.isFavorite
                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                : "bg-black/20 text-white hover:bg-black/40"
            }`}
          >
            <Heart className={`w-4 h-4 ${recipe.isFavorite ? "fill-current" : ""}`} />
          </Button>

          <div className="absolute bottom-4 left-6 right-6">
            <h2 className="text-2xl font-bold text-white mb-2">{recipe.title}</h2>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{recipe.readyTime} minutes</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{recipe.servings} servings</span>
              </div>
              <Badge className={getDifficultyColor(recipe.difficulty)}>
                {recipe.difficulty}
              </Badge>
            </div>
          </div>
        </div>

        {/* Scrollable content area */}
        <ScrollArea className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-8">
            {/* Description and tags */}
            <div>
              <p className="text-muted-foreground leading-relaxed mb-4">{recipe.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {recipe.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-muted/50 border-border">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Layout grid: Ingredients & Instructions | Nutrition & Tips */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Ingredients and Instructions */}
              <div className="md:col-span-2 space-y-8">
                {/* Ingredients */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[#10b981]">Ingredients</h3>
                  {recipe.ingredients.length ? (
                    <ul className="space-y-2">
                      {recipe.ingredients.map((ingredient, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="inline-block w-2 h-2 rounded-full bg-[#10b981]" />
                          <span>{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-muted-foreground">No ingredients available.</span>
                  )}
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[#6b46c1]">Instructions</h3>
                  {recipe.instructions.length ? (
                    <ol className="space-y-3 list-decimal list-inside">
                      {recipe.instructions.map((instruction, idx) => (
                        <li key={idx} className="leading-relaxed">{instruction}</li>
                      ))}
                    </ol>
                  ) : (
                    <span className="text-muted-foreground">No instructions available.</span>
                  )}
                </div>
              </div>

              {/* Nutrition & Quick Tips */}
              <div className="space-y-6">
                <div className="bg-muted/30 rounded-lg p-4 border border-border">
                  <h3 className="text-lg font-semibold mb-4 text-[#f59e0b]">Nutrition Info</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Calories</span>
                      <span className="font-bold">{recipe.nutrition.calories}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Protein</span>
                      <span className="font-bold">{recipe.nutrition.protein}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Carbs</span>
                      <span className="font-bold">{recipe.nutrition.carbs}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fat</span>
                      <span className="font-bold">{recipe.nutrition.fat}g</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#10b981]/10 to-[#6b46c1]/10 rounded-lg p-4 border border-[#10b981]/20">
                  <h4 className="font-semibold mb-2 text-[#10b981]">Quick Tips</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Prep ingredients in advance</li>
                    <li>• Taste and adjust seasoning</li>
                    <li>• Store leftovers for up to 3 days</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
