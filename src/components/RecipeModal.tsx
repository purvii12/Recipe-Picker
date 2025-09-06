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
      case "Easy": return "bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30";
      case "Medium": return "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30";
      case "Hard": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 flex flex-col bg-card border-border">

        {/* Fixed height header image and buttons */}
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
            <Heart
              className={`w-4 h-4 ${recipe.isFavorite ? "fill-current" : ""}`}
            />
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

        {/* Scrollable recipe content */}
        <ScrollArea className="flex-1 p-6 overflow-y-auto">

          <div className="space-y-6">
            <div>
              <p className="text-muted-foreground leading-relaxed">
                {recipe.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="bg-muted/50 border-border"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <Separator />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-[#10b981]">Ingredients</h3>
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li 
                        key={index} 
                        className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#10b981] mt-2 flex-shrink-0" />
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-[#6b46c1]">Instructions</h3>
                  <ol className="space-y-4">
                    {recipe.instructions.map((instruction, index) => (
                      <li 
                        key={index} 
                        className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#6b46c1] text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="leading-relaxed">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-muted/30 rounded-lg p-4 border border-border">
                  <h3 className="text-lg font-semibold mb-4 text-[#f59e0b]">Nutrition Info</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Calories</span>
                      <span className="font-medium">{recipe.nutrition.calories}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Protein</span>
                      <span className="font-medium">{recipe.nutrition.protein}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Carbs</span>
                      <span className="font-medium">{recipe.nutrition.carbs}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fat</span>
                      <span className="font-medium">{recipe.nutrition.fat}g</span>
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
