import React from "react";
import "./InputStyle.css";

interface CreateInputProps {
  placeHolder?: string;
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CreateInput: React.FC<CreateInputProps> = ({
  name,
  handleChange,
  placeHolder,
}) => {
  return (
    <input
      onChange={(event) => handleChange(event)}
      placeholder={placeHolder || ""}
      type="text"
      name={name}
      autoComplete="off"
      id="input"
    />
  );
};

export default CreateInput;
