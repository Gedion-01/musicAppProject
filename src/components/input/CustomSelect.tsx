import React from "react";
import styled from "@emotion/styled";
import { Text } from "rebass";

const Categories = [
  "R&B",
  "Electronic",
  "Rock",
  "Rap",
  "country/Ethiopia",
  "Pop",
];


const StyledSelect = styled.select`
  padding: 10px;
  /* Add playful spirit: */
  background-color: #f0f8ff;
  border: 1px solid #c0c0ff;
  font-family: cursive;
  font-size: 16px;
  outline: none;
  box-shadow: 0 0 2px rgba(0, 0, 255, 0.1);
  transition: 0.2s ease-in-out;
  border-radius: 8px; /* Rounded corners */

  /* Playful font */
  font-family: "Pacifico", cursive;
  font-size: 18px;

  /* Playful animations on focus */
  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 255, 0.2);
  }
`;
const StyledOption = styled.option`
    color: #333;
    padding: 10px 20px;
    border-radius: 5px;

    &:hover {
      background: red;
    }
  }
`;


const CustomSelect: React.FC = () => {
  return (
    <>
    <Text fontSize={2} fontWeight="bold" mb={0}>Select Song Genre</Text>
    <StyledSelect>
      {Categories.map((category, index) => (
        <StyledOption key={index} value={category}>
          {category}
        </StyledOption>
      ))}
    </StyledSelect>
    </>
  );
};

export default CustomSelect;
