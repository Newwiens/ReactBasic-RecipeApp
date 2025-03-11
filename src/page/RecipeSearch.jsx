import { Input } from "@chakra-ui/react";

export const RecipeSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <>
      <Input
        w={{ base: "17rem", sm: "21rem", md: "32.5em" }}
        h="3.5rem"
        mt={{ base: "0.2rem", md: "0.5rem" }}
        boxShadow="md"
        borderColor="blue.300"
        type="text"
        placeholder="Zoek recipte naam of health label"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </>
  );
};
