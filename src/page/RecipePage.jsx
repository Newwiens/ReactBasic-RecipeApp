// RecipePage.jsx
import { useParams, useNavigate } from "react-router-dom";
import {
  Heading,
  Image,
  Card,
  Text,
  Flex,
  Box,
  VStack,
  Table,
  Button,
} from "@chakra-ui/react";
import { data } from "../utils/data";
import { TagLabels } from "./TagLabels";

export const RecipePage = () => {
  const { label } = useParams();
  const decodedLabel = decodeURIComponent(label);
  const backBtn = useNavigate();

  const recipe = data.hits.find(
    ({ recipe }) => recipe.label === decodedLabel
  )?.recipe;

  if (!recipe) {
    return <Text>Recept niet gevonden</Text>;
  }

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      h="auto"
      gap="1rem"
    >
      {/* Header */}
      <Flex w="100%" justify="start">
        <Button colorScheme="blue" variant="solid" onClick={() => backBtn("/")}>
          TERUG
        </Button>
      </Flex>

      {/* Card page*/}
      <Card
        sx={{
          width: {
            base: "20rem",
            sm: "25rem",
            md: "100%",
          },
        }}
        //pb="1rem"
      >
        <Image
          w="100%"
          h="15rem"
          objectFit="cover"
          src={recipe.image}
          alt={recipe.label}
        />
        {/* block Recipe container */}
        <Flex
          gap="2rem"
          sx={{
            p: { base: "1rem", md: "1rem" },
          }}
        >
          <VStack>
            {/* block Recipe info */}
            <Flex direction="column" w="100%">
              <Heading fontSize="2xl">{recipe.label}</Heading>
              <Text textTransform="uppercase" color="grey">
                {recipe.mealType}
              </Text>
              <Text>
                Total cooking time: <strong>{recipe.totalTime} minutes</strong>
              </Text>

              <Text>
                Servings: <strong>{recipe.yield}</strong>
              </Text>

              <Box pb="0.5rem">
                <Text fontWeight="bold" pb="0.5rem">
                  Ingredients:
                </Text>
                {recipe.ingredientLines.map((ingredient, ingredientKey) => (
                  <Text key={ingredientKey} pb="0.2rem">
                    {ingredient}
                  </Text>
                ))}
              </Box>
            </Flex>

            {/* block Labels*/}
            <Flex
              justify="center"
              gap="1rem"
              sx={{
                flexDirection: { base: "column", md: "row" },
              }}
            >
              <VStack
                sx={{
                  w: { base: "18rem", sm: "100%", lg: "50%" },
                }}
                flex="1"
                backgroundColor="blue.100"
                boxShadow="md"
                p="0.5rem"
                borderRadius="10px"
              >
                {["ENERC_KCAL", "PROCNT", "FAT", "CHOCDF", "CHOLE", "NA"].map(
                  (key) => (
                    <Flex
                      key={key}
                      pl="0.5rem"
                      w="18rem"
                      //direction="column"
                      //justify="space-between"
                    >
                      <Table fontWeight="bold">
                        {recipe.totalNutrients[key].label}
                        {":"}
                      </Table>
                      <Table>
                        {Math.round(recipe.totalNutrients[key].quantity)} {""}
                        {recipe.totalNutrients[key].unit}
                      </Table>
                    </Flex>
                  )
                )}
              </VStack>
              <VStack
                sx={{
                  w: { base: "100%", lg: "50%" },
                }}
                flex="1"
                justifyContent="end"
                backgroundColor="blue.100"
                boxShadow="md"
                borderRadius="10px"
              >
                <Box fontSize="1em" fontWeight="bold" p="0.5rem" w="17rem">
                  <Text pb="0.5rem">Health Label:</Text>
                  <TagLabels
                    filterHealthLabels={recipe.healthLabels || []}
                    allHealthLabels={false}
                  />

                  <Text pb="0.5rem">Diet:</Text>
                  <TagLabels dietLabels={recipe.dietLabels} />

                  <Text pb="0.5rem">Cautions:</Text>
                  <TagLabels cautionLabels={recipe.cautions} />
                </Box>
              </VStack>
            </Flex>
          </VStack>
        </Flex>
      </Card>
    </Flex>
  );
};
