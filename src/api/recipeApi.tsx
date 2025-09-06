const API_KEY = "bb020d1bfbcd410d992888e3012f3f63";
const BASE_URL = "https://api.spoonacular.com";

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

export async function fetchRecipesByIngredients(ingredients: string[]): Promise<Recipe[]> {
  const query = ingredients.join(",");
  const url = `${BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&includeIngredients=${query}&diet=vegetarian&number=10&addRecipeInformation=true`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }
  const data = await response.json();

  // Map API response to your app's Recipe type
  return data.results.map((r: any) => ({
    id: r.id.toString(),
    title: r.title,
    image: r.image,
    readyTime: r.readyInMinutes,      // rename to match your interface
    servings: r.servings,
    difficulty: "Medium",             // default, adjust if you get difficulty info later
    tags: r.diets || [],
    isFavorite: false,
    description: r.summary || "",
    ingredients: (r.extendedIngredients || []).map((ing: any) => ing.original),
    instructions: [],                 // can fetch extra details in another call if needed
    nutrition: {
      calories: r.nutrition?.nutrients?.find((n: any) => n.name === "Calories")?.amount || 0,
      protein: r.nutrition?.nutrients?.find((n: any) => n.name === "Protein")?.amount || 0,
      carbs: r.nutrition?.nutrients?.find((n: any) => n.name === "Carbohydrates")?.amount || 0,
      fat: r.nutrition?.nutrients?.find((n: any) => n.name === "Fat")?.amount || 0,
    },
  }));
}

export async function fetchRandomRecipe(): Promise<Recipe> {
  const url = `${BASE_URL}/recipes/random?apiKey=${API_KEY}&number=1&tags=vegetarian`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch surprise recipe");
  }
  const data = await response.json();

  const r = data.recipes[0];

  return {
    id: r.id.toString(),
    title: r.title,
    image: r.image,
    readyTime: r.readyInMinutes,
    servings: r.servings,
    difficulty: "Medium",
    tags: r.diets || [],
    isFavorite: false,
    description: r.summary || "",
    ingredients: (r.extendedIngredients || []).map((ing: any) => ing.original),
    instructions: [],
    nutrition: {
      calories: r.nutrition?.nutrients?.find((n: any) => n.name === "Calories")?.amount || 0,
      protein: r.nutrition?.nutrients?.find((n: any) => n.name === "Protein")?.amount || 0,
      carbs: r.nutrition?.nutrients?.find((n: any) => n.name === "Carbohydrates")?.amount || 0,
      fat: r.nutrition?.nutrients?.find((n: any) => n.name === "Fat")?.amount || 0,
    },
  };
}
export async function fetchRecipeDetails(id: string): Promise<any> {
  const url = `${BASE_URL}/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch recipe details");
  return await response.json();
}
