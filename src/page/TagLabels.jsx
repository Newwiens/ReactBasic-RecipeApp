// TagLabels.jsx
import { getFilterHealthLabels, renderLabels } from "../utils/labbelUtils.jsx";
import { Box } from "@chakra-ui/react";

export const TagLabels = ({
  filterHealthLabels = [],
  allHealthLabels = true,
  dietLabels = [],
  cautionLabels = [],
  width = "100%",
  ...props
}) => {
  // Als een specifieke zoekopdracht wordt gebruikt, toon ALLE opgegeven labels
  const filteredHealthLabels = allHealthLabels
    ? filterHealthLabels
    : getFilterHealthLabels(filterHealthLabels, allHealthLabels);

  if (
    filteredHealthLabels.length === 0 &&
    (!dietLabels || dietLabels.length === 0) &&
    (!cautionLabels || cautionLabels.length === 0)
  ) {
    return null;
  }

  return (
    <Box width={width} {...props}>
      {filteredHealthLabels.length > 0 &&
        renderLabels(filteredHealthLabels, "green.200")}
      {dietLabels.length > 0 && renderLabels(dietLabels, "blue.300")}
      {cautionLabels.length > 0 && renderLabels(cautionLabels, "pink.300")}
    </Box>
  );
};
