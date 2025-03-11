import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecipeListPage } from "./page/RecipeListPage";
import { Heading, VStack } from "@chakra-ui/react";
import { RecipePage } from "./page/RecipePage.jsx";

export const App = () => {
  // Your state code here
  return (
    <Router>
      <VStack m="3rem">
        <Heading fontSize={{ base: "1.3em", sm: "1.6em", md: "2.5em" }}>
          Welcome to the Recipe App
        </Heading>

        <Routes>
          {/* Hoofdpagina met de receptenlijst */}
          <Route path="/" element={<RecipeListPage />} />

          {/* Detailpagina voor een specifiek recept */}
          <Route path="/recipe/:label" element={<RecipePage />} />
        </Routes>
      </VStack>
    </Router>
  );
};
export default App;
