// RecipeListPage.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heading, Image, Card, Text, Flex, Box, Grid } from "@chakra-ui/react";
import { data } from "../utils/data";
import { TagLabels } from "./TagLabels";
import { RecipeSearch } from "./RecipeSearch";

export const RecipeListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const words = searchTerm.toLowerCase().split(" ");

  const filteredRecipes = data.hits.filter(({ recipe }) =>
    words.every(
      (word) =>
        recipe.label.toLowerCase().includes(word) ||
        recipe.healthLabels.some((label) =>
          label.toLowerCase().includes(word)
        ) ||
        recipe.dietLabels.some((label) => label.toLowerCase().includes(word)) ||
        recipe.cautions.some((label) => label.toLowerCase().includes(word))
    )
  );

  return (
    <>
      <RecipeSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Als er geen resultaten zijn, toon een melding */}
      {filteredRecipes.length === 0 ? (
        <Text textAlign="center" fontSize="1.5rem" color="red">
          Geen resultaten gevonden voor: "{searchTerm}". Probeer opnieuw.
        </Text>
      ) : (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)", //min-max= 0px (default)
            sm: "repeat(1, 1fr)", //min-max= 30em (≈ 480px)
            md: "repeat(3, 1fr)", //min-max= 48em (≈ 768px)
            lg: "repeat(4, 1fr)", //min-max= 62em (≈ 992px)
            xl: "repeat(4, 1fr)",
            // w={{ base: "100%", sm: "80%", md: "60%", lg: "40%" }}
            /* sx={{
            base: { fontSize: "1.3em" },
            sm: { fontSize: "1em" },*/
          }}
          gap={1}
          p="1rem"
        >
          {filteredRecipes.map(({ recipe }) => {
            // Bepaal welke health labels getoond moeten worden
            const defaultLabels = ["Vegan", "Vegetarian"];
            const matchingLabels = recipe.healthLabels.filter((label) =>
              words.some((word) => label.toLowerCase().includes(word))
            );
            const visibleLabels = searchTerm
              ? matchingLabels
              : recipe.healthLabels.filter((label) =>
                  defaultLabels.includes(label)
                );

            return (
              <Link
                to={`/recipe/${encodeURIComponent(recipe.label)}`}
                key={recipe.label}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card
                  sx={{
                    width: {
                      base: "20rem",
                      sm: "25rem",
                      md: "14.5rem",
                      lg: "14rem",
                      xl: "20rem",
                    }, // ✅ Breedte responsief maken
                    height: { base: "auto", md: "32rem" },
                    mb: { base: "1rem" },
                    m: { md: "0.3rem" },
                  }}
                  overflow="hidden"
                  boxShadow="xl"
                  borderRadius="xl"
                >
                  <Image
                    w="100%"
                    h="12rem"
                    objectFit="cover"
                    src={recipe.image}
                    alt={recipe.label}
                  />
                  <Box p="1rem">
                    <Flex
                      wrap="wrap"
                      flexDirection="column"
                      textAlign="center"
                      alignItems="center"
                      gap="0.5rem"
                    >
                      <Text>Meal Type: {recipe.mealType}</Text>
                      <Heading
                        fontSize={{
                          base: "1.2em",
                          sm: "1.5em",
                          md: "1.2em",
                          xl: "1.5em",
                        }}
                        gap="0.5rem"
                      >
                        {recipe.label}
                      </Heading>
                      <Flex flexDirection="column">
                        <Text>Health Label:</Text>
                        <TagLabels filterHealthLabels={visibleLabels} />
                      </Flex>
                      <Flex flexDirection="column">
                        <Text>Diet Label:</Text>
                        <TagLabels dietLabels={recipe.dietLabels} />
                      </Flex>
                      <Text>Dish: {recipe.dishType}</Text>
                      <Flex flexDirection="column">
                        <Text mb="0px">Cautions:</Text>
                        <TagLabels cautionLabels={recipe.cautions} />
                      </Flex>
                    </Flex>
                  </Box>
                </Card>
              </Link>
            );
          })}
        </Grid>
      )}
    </>
  );
};
