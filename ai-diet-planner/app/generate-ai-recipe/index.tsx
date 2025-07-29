import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import Colors from "@/shared/Colors";
import Button from "@/components/shared/Button";
import { GenerateAIRecipe } from "@/services/AiModel";
import Prompt from "@/shared/Prompt";
import { RecipeArray } from "@/types/recipe.types";
import RecipeOptionList from "@/components/RecipeOptionList";

export default function GenerateAiRecipe() {
  const [input, setInput] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [recipeOption, setRecipeOption] = useState<RecipeArray>([]);
  const GenerateRecipeOptions = async () => {
    setLoading(true);
    // Make AI Model call to generate recipe Options
    try {
      const PROMPT = input + Prompt.GENERATE_RECIPE_OPTION_PROMPT;
      const result = await GenerateAIRecipe.sendMessage(PROMPT);
      const resp = JSON.parse(result.response.text());
      setRecipeOption(resp);
      console.log(resp);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView
      style={{
        padding: 20,
        paddingTop: 30,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          AI Recipe Generator
        </Text>
        <Text style={{ marginTop: 5, color: Colors.GRAY, fontSize: 16 }}>
          Generate Personalized recipes using AI
        </Text>
        <TextInput
          style={styles.textArea}
          multiline
          placeholder="Enter your ingrdient or recipe name"
          placeholderTextColor={Colors.GRAY}
          value={input}
          onChangeText={(value) => setInput(value)}
        />
        <View style={{ marginTop: 25 }}>
          <Button
            title="Generate Recipe"
            onPress={GenerateRecipeOptions}
            loading={loading}
          />
        </View>
        {recipeOption?.length > 0 && (
          <RecipeOptionList options={recipeOption} />
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  textArea: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20,
    marginTop: 15,
    height: 150,
    textAlignVertical: "top",
    backgroundColor: Colors.WHITE,
  },
});
