import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { IngredientInput } from "./components/IngredientInput";
import { Recipe, RecipeCard } from "./components/RecipeCard";
import { RecipeModal } from "./components/RecipeModal";
import { LoadingSpinner, RecipeCardSkeleton } from "./components/LoadingSpinner";
import { Button } from "./components/ui/button";
import { Search, Shuffle, ChefHat } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { fetchRecipesByIngredients, fetchRandomRecipe, fetchRecipeDetails } from "./api/recipeApi";

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '');
}

export default function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [detailedRecipe, setDetailedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorite = (id: string) => {
    setRecipes((prev) => prev.map(recipe =>
      recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
    ));
    if (selectedRecipe?.id === id)
      setSelectedRecipe(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
  };

  const favoriteRecipes = recipes.filter(recipe => recipe.isFavorite);

  useEffect(() => {
    if (selectedRecipe) {
      fetchRecipeDetails(selectedRecipe.id)
        .then(data => {
          const formatted: Recipe = {
            ...selectedRecipe,
            ingredients: data.extendedIngredients.map((ing: any) => ing.original),
            instructions: data.analyzedInstructions?.[0]?.steps.map((s: any) => s.step) || [],
            description: stripHtml(data.summary || selectedRecipe.description),
            nutrition: {
              calories: data.nutrition?.nutrients.find((n: any) => n.name === "Calories")?.amount || 0,
              protein: data.nutrition?.nutrients.find((n: any) => n.name === "Protein")?.amount || 0,
              carbs: data.nutrition?.nutrients.find((n: any) => n.name === "Carbohydrates")?.amount || 0,
              fat: data.nutrition?.nutrients.find((n: any) => n.name === "Fat")?.amount || 0,
            }
          };
          setDetailedRecipe(formatted);
        }).catch(() => setDetailedRecipe(null));
    } else {
      setDetailedRecipe(null);
    }
  }, [selectedRecipe]);

  const searchRecipes = async () => {
    if (ingredients.length === 0) {
      setRecipes([]);
      return;
    }
    setIsLoading(true);
    setRecipes([]);
    try {
      const results = await fetchRecipesByIngredients(ingredients);
      setRecipes(results);
    } catch {
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const surpriseMe = async () => {
    setIsLoading(true);
    setRecipes([]);
    try {
      const random = await fetchRandomRecipe();
      setRecipes([random]);
    } catch {
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const openRecipeModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setDetailedRecipe(null);
    setIsModalOpen(true);
  };

  const closeRecipeModal = () => {
    setSelectedRecipe(null);
    setDetailedRecipe(null);
    setIsModalOpen(false);
  };

  const toggleFavoritesView = () => {
    setShowFavorites(prev => !prev);
    if (!showFavorites) {
      setRecipes(favoriteRecipes);
    } else {
      setRecipes([]);
    }
  };

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const displayedRecipes = showFavorites ? favoriteRecipes : recipes;

  return (
    <div className="min-h-screen bg-background">
      <Header
        favoritesCount={favoriteRecipes.length}
        onFavoritesClick={toggleFavoritesView}
      />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {!showFavorites && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#10b981] to-[#6b46c] bg-clip-text text-transparent">
                Find Your Perfect Vegetarian Recipe
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Enter your available ingredients and discover delicious vegetarian recipes tailored to your kitchen.
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <IngredientInput
                ingredients={ingredients}
                onIngredientsChange={setIngredients}
              />

              <div className="flex gap-4 justify-center">
                <Button
                  onClick={searchRecipes}
                  disabled={isLoading}
                  size="lg"
                  className="bg-[#6b46c1] hover:bg-[#6b46c1]/80 text-white"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Find Recipes
                </Button>
                <Button
                  onClick={surpriseMe}
                  disabled={isLoading}
                  variant="outline"
                  size="lg"
                  className="text-[#10b981] border-[#10b981]"
                >
                  <Shuffle className="w-5 h-5 mr-2" />
                  Surprise Me
                </Button>
              </div>
            </div>
          </motion.section>
        )}

        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-[#10b981]" />
              {showFavorites ? "Your Favorite Recipes" : "Recipe Results"}
            </h3>
            {displayedRecipes.length > 0 && (
              <span className="text-muted-foreground">
                {displayedRecipes.length} recipe{displayedRecipes.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          <AnimatePresence>
            {isLoading ? (
              <motion.div key="loading" className="text-center">
                <LoadingSpinner />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                  {[...Array(6)].map((_, i) => (<RecipeCardSkeleton key={i} />))}
                </div>
              </motion.div>
            ) : displayedRecipes.length ? (
              <motion.div
                key="results"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {displayedRecipes.map((recipe, index) => (
  <motion.div
    key={recipe.id}  // <-- key on this wrapping div, NOT passed into RecipeCard props
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <RecipeCard
      recipe={recipe}
      onToggleFavorite={toggleFavorite}
      onViewDetails={openRecipeModal}  // make sure prop name matches RecipeCard's
    />
  </motion.div>
))}

              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#10b981]/40 to-[#6b46c1]/40 flex items-center justify-center mb-6">
                  <ChefHat className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  {showFavorites ? "No favorites yet" : "Ready to discover recipes?"}
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {showFavorites ? "Save your favorite recipes to see them here." : "Add some ingredients or try the surprise me button."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      <RecipeModal
        recipe={detailedRecipe ?? selectedRecipe}
        isOpen={isModalOpen}
        onClose={closeRecipeModal}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}
