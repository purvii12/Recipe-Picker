const API_KEY = "bb020d1bfbcd410d992888e3012f3f63";
const BASE_URL = "https://api.spoonacular.com";

export async function fetchRecipeDetails(id: string): Promise<any> {
  const url = `${BASE_URL}/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch recipe details");
  }
  const data = await response.json();
  return data;
}
