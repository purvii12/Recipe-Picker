import { useState, useRef, useEffect } from "react";
import { X, Plus, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "motion/react";

interface IngredientInputProps {
  ingredients: string[];
  onIngredientsChange: (ingredients: string[]) => void;
}

const commonIngredients = [
  "tomatoes", "onions", "garlic", "bell peppers", "mushrooms", "spinach",
  "broccoli", "carrots", "zucchini", "eggplant", "potatoes", "sweet potatoes",
  "chickpeas", "black beans", "lentils", "tofu", "tempeh", "quinoa",
  "rice", "pasta", "olive oil", "coconut milk", "herbs", "spices"
];

export function IngredientInput({ ingredients, onIngredientsChange }: IngredientInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputValue.length > 0) {
      const filtered = commonIngredients.filter(
        ingredient =>
          ingredient.toLowerCase().includes(inputValue.toLowerCase()) &&
          !ingredients.includes(ingredient)
      );
      setSuggestions(filtered.slice(0, 6));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue, ingredients]);

  const addIngredient = (ingredient: string) => {
    if (ingredient && !ingredients.includes(ingredient)) {
      onIngredientsChange([...ingredients, ingredient]);
      setInputValue("");
      setShowSuggestions(false);
    }
  };

  const removeIngredient = (ingredient: string) => {
    onIngredientsChange(ingredients.filter(i => i !== ingredient));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addIngredient(inputValue.trim());
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Type an ingredient (e.g., tomatoes, spinach, tofu)..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 pr-16 bg-input border-border focus:border-[#6b46c1] focus:ring-[#6b46c1] transition-colors"
          />
          <Button
            type="button"
            size="sm"
            onClick={() => addIngredient(inputValue.trim())}
            disabled={!inputValue.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#6b46c1] hover:bg-[#6b46c1]/80"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 w-full bg-card border border-border rounded-md shadow-lg z-10 max-h-48 overflow-y-auto"
            >
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => addIngredient(suggestion)}
                  className="w-full text-left px-4 py-2 hover:bg-[#6b46c1]/10 focus:bg-[#6b46c1]/10 focus:outline-none transition-colors first:rounded-t-md last:rounded-b-md"
                >
                  {suggestion}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {ingredients.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="flex flex-wrap gap-2"
        >
          <AnimatePresence>
            {ingredients.map((ingredient) => (
              <motion.div
                key={ingredient}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Badge
                  variant="secondary"
                  className="bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30 hover:bg-[#10b981]/30 transition-colors"
                >
                  {ingredient}
                  <button
                    onClick={() => removeIngredient(ingredient)}
                    className="ml-2 hover:text-red-400 transition-colors"
                    aria-label={`Remove ${ingredient}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}