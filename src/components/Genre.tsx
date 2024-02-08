import React from 'react'
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Box, Text } from "rebass";

type reactProps = {
    name: string;
    imgUrl: string;
}

const Genre: React.FC<reactProps> = ({name, imgUrl}) => {
    
  const genreStylesM = css`
    width: 200px;
    gap: 4px;
  `;

  return (
    <Flex
        flexDirection={"column"}
        css={genreStylesM.styles}
      >
        <Flex>
        <img
          style={{ width: "200px", height: "200px", borderRadius: "10px" }}
          src={
            imgUrl
          }
        />
        </Flex>
        <Box>
          <Flex
            flexDirection={"row"}
            alignContent={"center"}
            justifyContent={"center"}
          >
            <Text fontSize={3} fontWeight="bold">{name}</Text>
          </Flex>
        </Box>
      </Flex>
  )
}

export default Genre