import { Input } from "@chakra-ui/react";
import * as React from "react";

type StyledInputProps = {
  placeHolder: string;
  onChange(value: number): void;
};

const StyledInput = ({ placeHolder, onChange }: StyledInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(event.currentTarget.value);
    if (val && val > 2) {
      onChange(val);
    }
  };

  return (
    <Input
      onChange={handleChange}
      placeholder={placeHolder}
      variant="outline"
      size="md"
    />
  );
};

export default StyledInput;
