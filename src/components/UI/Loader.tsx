import { Skeleton, Stack } from "@chakra-ui/react";
import * as React from "react";

const Loader = () => {
  return (
    <Stack>
      <Skeleton height="4rem" />
      <Skeleton height="4rem" />
      <Skeleton height="4rem" />
      <Skeleton height="4rem" />
      <Skeleton height="4rem" />
    </Stack>
  );
};

export default Loader;
