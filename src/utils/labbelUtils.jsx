//logica voor filter toepassen of niet voor HealthLabels
import { Flex, Tag } from "@chakra-ui/react";

export const getFilterHealthLabels = (
  filterHealthLabels = [],
  allHealthLabels = true
) => {
  if (!allHealthLabels) {
    return filterHealthLabels; //Geen filter toepassen, gewoon teruggeven
  }

  const filtered = filterHealthLabels.filter(
    (healthLabel) => healthLabel === "Vegetarian" || healthLabel === "Vegan"
  );

  return filtered;
};

export const renderLabels = (labels, bgColor) => {
  return (
    <Flex wrap="wrap" gap="0.3rem">
      {labels &&
        labels.map((label) => (
          <Tag
            bg={bgColor}
            ml="0.25rem"
            p="0.25rem"
            w="fit-content"
            key={label}
          >
            {label}
          </Tag>
        ))}
    </Flex>
  );
};
