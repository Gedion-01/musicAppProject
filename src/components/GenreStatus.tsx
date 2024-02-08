import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Box, Text } from "rebass";
import StatusCard from "../components/StatusCard";
import React from "react";

type reactProps = {
  name: string;
  total: number;
};

const GenreStatus : React.FC<reactProps>  = ({ name, total }) => {
  
  const tabularStyle = css`
    margin-top: 10px;
    width: 100%;
    padding: 12px 10px;
    // background: #1f3044;
    color: #1F3044;
    &:hover {
      background: #a8bcc3;
      border-radius: 10px;
    }
    // border-radius: 10px;
    border-bottom: 1px solid #a8bcc3;
  `;
  
  
  return (
    <Flex flexDirection="column">
      {/* Genres */}
      
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        css={tabularStyle.styles}
      >
        <Box>
          <Text fontSize={3}>
            {name}
          </Text>
        </Box>
        <Box mr={3}>
          <Text fontSize={3} fontWeight="regular">
            {total}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}

export default GenreStatus;
