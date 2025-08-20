import  { useState } from "react";
import { InputField } from "../components/InputField";
import type { InputFieldProps } from "../components/InputField";

export default {
  title: "Components/InputField",
  component: InputField,
  argTypes: {
    variant: { control: "radio", options: ["filled", "outlined", "ghost"] },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    type: { control: "radio", options: ["text", "password"] },
    clearable: { control: "boolean" },
    showPasswordToggle: { control: "boolean" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
  },
};

export const Basic = (args: InputFieldProps) => {
  const [value, setValue] = useState("");
  return (
    <InputField
      {...args}
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
};

Basic.args = {
  label: "Your Name",
  placeholder: "Enter your name",
  helperText: "Please enter your full name",
  errorMessage: "Name is required",
  variant: "outlined",
  size: "md",
  clearable: true,
  type: "text",
  showPasswordToggle: false,
  loading: false,
  disabled: false,
  invalid: false,
};