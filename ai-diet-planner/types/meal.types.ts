import { Id } from "@/convex/_generated/dataModel";
import { RecipeSelectedGenerate } from "./recipe.types";

export interface MealPlane {
  recipeId: Id<"recipes">,
  date: string,
  mealType: string,
  uid: Id<'users'>,
  _id: Id<'mealPlan'>,
  _creationTime: number,
  status?: boolean,
  calories?: number,
}
export interface MealPlanWithRecipe {
  mealPlan: MealPlane,
  recipe: RecipeSelectedGenerate | null,
}
