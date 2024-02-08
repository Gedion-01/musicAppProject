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
  const overViewContainerStyle = css`
    display: flex;
    gap: 10px;

    flex-wrap: wrap;
  `;
  const tabularStyle = css`
    margin-top: 10px;
    width: 100%;
    padding: 12px 10px;
    color: #e1f2f7;
    background: #1f3044;
    border-radius: 10px;
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
          <Text fontSize={3} fontWeight="bold">
            {name}
          </Text>
        </Box>
        <Box>
          <Text fontSize={3} fontWeight="regular">
            {total}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}

export default GenreStatus;
