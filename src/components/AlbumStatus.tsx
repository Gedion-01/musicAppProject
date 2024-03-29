import { css } from "@emotion/react";
import { Flex, Box, Text } from "rebass";
import React from "react";

type reactProps = {
    name: string;
    total: number;
}

const AlbumStatus: React.FC<reactProps> = ({ name, total }) => {
    const tabularStyle = css`
    margin-top: 10px;
    width: 100%;
    
    // background: #1f3044;
    color: #1F3044;
    &:hover {
      background: #7DA2A9;
      border-radius: 5px;
    }
    // border-radius: 10px;
    border-bottom: 1px solid #a8bcc3;
    transition: .4s;
  `;
  return (
    
    <Flex flexDirection="column">
    <Flex
        flexDirection="row"
        justifyContent="space-between"
        css={tabularStyle.styles}
        p={[2]}
    >
        <Box>
            <Text fontSize={[2, 3, 4]}>
                {name}
            </Text>
        </Box>
        <Box mr={3}>
            <Text fontSize={[2, 3, 4]} fontWeight="regular">
                {total}
            </Text>
        </Box>
    </Flex>
</Flex>
  )
}

export default AlbumStatus
