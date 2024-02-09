import React, { useEffect, useState } from "react";
import { FormEvent } from 'react';
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Box, Text } from "rebass";
import { UseSelector, useDispatch } from "react-redux";
import { RootState } from "../state/store";
import { useNavigate } from "react-router";


const StyledInput = styled.input`
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

  &:focus {
    box-shadow: 0 0 4px rgba(0, 0, 255, 0.2);
    border-color: #9090ff;
  }
`;
const Categories = [
  "R&B",
  "Electronic",
  "Rock",
  "Rap",
  "country/Ethiopia",
  "Pop",
  "Hip"
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

const StyledButton = styled.button`
  padding: 10px;
  /* Add playful spirit: */

  background-color: #d0e3f0;
  border: 1px solid #c0c0ff;
  font-family: cursive;
  font-size: 16px;
  outline: none;
  box-shadow: 0 0 2px rgba(0, 0, 255, 0.1);
  transition: 0.2s ease-in-out;
  border-radius: 8px; /* Rounded corners */
  cursor: pointer; /* Ensure cursor changes on hover */

  &:hover {
    background-color: #f0f8ff;
  }

  &:focus {
    box-shadow: 0 0 4px rgba(0, 0, 255, 0.2);
    border-color: #9090ff;
  }
`;
const StyledForm = styled.form`
`
interface InputChangeEvent {
    target: {
        name: string;
        value: string;
    }
}

function EditSongPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
   const [formData, setFormData]  = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    coverImageUrl: ""
  })
  
  
  const genreStyles = css`
    gap: 12px;
    flex-wrap: wrap;
    width: 50%;
  `;
  function handleInputChange(e: InputChangeEvent) {
    const {name, value} = e.target
    setFormData({
        ...formData,
        [name]: value
    })
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch({type: "song/createSong", payload: {data: formData}})
    
    navigate("/")
  }

  return (
    <Flex flexDirection={"column"}>
      <Box>
        <Text fontSize={5} fontWeight="bold" mb={2}>
          Add Song
        </Text>
      </Box>
      <StyledForm onSubmit={handleSubmit}>
        <Flex flexDirection={"column"} css={genreStyles.styles}>
          <StyledInput required type="text" placeholder="Song Title" name="title" value={formData.title} onChange={handleInputChange} />
          <StyledInput required type="text" placeholder="Artist Name" name="artist" value={formData.artist} onChange={handleInputChange}/>
          <StyledInput required type="text" placeholder="Album Name" name="album" value={formData.album} onChange={handleInputChange}/>
          <StyledInput required type="text" placeholder="Song Cover Image URL" name="coverImageUrl" value={formData.coverImageUrl} onChange={handleInputChange}/>
          <Text fontSize={2} fontWeight="bold" mb={0}>
            Select Song Genre
          </Text>
          <StyledSelect required name="genre" onChange={handleInputChange} value={formData.genre}>
            {Categories.map((category, index) => (
              <StyledOption key={index} value={category}>
                {category}
              </StyledOption>
            ))}
          </StyledSelect>
          <StyledButton type="submit">Add Song</StyledButton>
        </Flex>
      </StyledForm>
    </Flex>
  );
}

export default EditSongPage;
