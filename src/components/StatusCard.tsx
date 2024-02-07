import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Box, Text } from "rebass";

export default function StatusCard() {
    const cardStyle = css`
    gap: 20px;
    background-color: #1F3044;
    padding: 15px;
    color: white;
    border-radius: 10px;
  `;

    return(
        <>
        {/* card */}
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          css={cardStyle}
        >
          <Box>
            <Text fontSize={3}>Total Songs</Text>
          </Box>
          <Box>
            <Text fontSize={6} fontWeight="bold">
              6
            </Text>
          </Box>
        </Flex>
        </>
    )
}