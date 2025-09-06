import { useState } from "react";
import { fetchRecipesByIngredients, fetchRandomRecipe, Recipe } from "../api/recipeApi";

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getRecipes(ingredients: string[]) {
    setLoading(true);
    setError("");
    try {
      const results = await fetchRecipesByIngredients(ingredients);
      if (results.length === 0) {
        setError("No recipes found.");
        setRecipes([]);
      } else {
        setRecipes(results);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  async function getSurpriseRecipe() {
    setLoading(true);
    setError("");
    try {
      const recipe = await fetchRandomRecipe();
      setRecipes([recipe]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return { recipes, loading, error, getRecipes, getSurpriseRecipe };
}
