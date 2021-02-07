import { Box, Button, Input } from "@chakra-ui/react";
import React from "react";

const Quantity = ({ value, onChange, ...props }) => {
  return (
    <Box d="flex" h="40px" mt="0.25rem">
      <Button
        variant="unstyled"
        onClick={() => onChange(value + 1)}
        border="1px solid"
        borderRight="none"
        borderRightRadius="0px"
        h="inherit"
      >
        +
      </Button>
      <Input
        type="number"
        required="true"
        min="1"
        border="none"
        value={value}
        size="sm"
        width="4rem"
        h="40px"
        textAlign="center"
        onChange={(e) => onChange(e.target.value)}
        borderY="1px solid"
        borderRadius={0}
        {...props}
      ></Input>
      <Button
        h="inherit"
        border="1px solid"
        borderLeft="none"
        borderLeftRadius="0px"
        variant="unstyled"
        disabled={value <= 1}
        onClick={(e) => onChange(value - 1)}
      >
        -
      </Button>
    </Box>
  );
};
export default Quantity;
