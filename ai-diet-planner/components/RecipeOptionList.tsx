import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Recipe, RecipeArray } from "@/types/recipe.types";
import Colors from "@/shared/Colors";
import Prompt from "@/shared/Prompt";
import { GenerateAIRecipe, GenerateRecipeImage } from "@/services/AiModel";
import LoadingDialog from "./LoadingDialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@/context/UserContext";
import { useRouter } from "expo-router";
interface RecipeOptionListProps {
  options: RecipeArray;
}
export default function RecipeOptionList({ options }: RecipeOptionListProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const CreateRecipe = useMutation(api.Recipes.CreateRecipe);
  const onRecipeOptionSelect = async (recipe: Recipe) => {
    setLoading(true);
    const PROMPT =
      "RecipeName: " +
      recipe?.recipeName +
      " Description:" +
      recipe?.description +
      Prompt.GENERATE_COMPLETE_RECIPE_PROMPT;
    try {
      const result = await GenerateAIRecipe.sendMessage(PROMPT);
      const resp = JSON.parse(result.response.text());
      // Generate RecipeImage
      // const aiImageResp = await GenerateRecipeImage(resp?.imagePrompt);
      // const data = await aiImageResp.json();
      const imageRecipe =
        // data.output[0];
        "https://modelslab-bom.s3.amazonaws.com/modelslab/84bc6f3d-06d4-4413-8926-7ce12df02239-0.jpg";
      // Save to Database
      const saveRecipesResult = await CreateRecipe({
        jsonData: resp,
        imageUrl: imageRecipe,
        recipeName: resp?.recipeName,
        uid: user?._id!,
      });
      // Redirect to Recipe Details Screen
      router.push({
        pathname: "/recipe-detail",
        params: { recipeId: saveRecipesResult },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Select Recipe
      </Text>
      <View>
        {options?.map((item, index) => (
          <TouchableOpacity
            onPress={() => onRecipeOptionSelect(item)}
            key={index}
            style={{
              padding: 15,
              borderWidth: 0.2,
              borderRadius: 15,
              marginTop: 15,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {item?.recipeName}
            </Text>
            <Text
              style={{
                color: Colors.GRAY,
              }}
            >
              {item?.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <LoadingDialog loading={loading} />
    </View>
  );
}
