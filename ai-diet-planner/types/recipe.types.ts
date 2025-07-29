import { Id } from "@/convex/_generated/dataModel";

export interface Recipe {
  recipeName: string;
  description: string;
  ingredients: string[];
}

export type RecipeArray = Recipe[];

export interface Ingredient {
  icon: string;
  ingredient: string;
  quantity: string;
}

export interface RecipeDetail {
  recipeName: string;
  description: string;
  calories: number;
  cookTime: number;
  serveTo: number;
  category: string[];
  ingredients: Ingredient[];
  steps: string[];
  imagePrompt?: string;
}

export interface RecipeSelectedGenerate {
  jsonData: RecipeDetail,
  imageUrl: string,
  recipeName: string,
  uid: Id<"users">,
  _id: Id<"recipes">,
  _creationTime: number,
}