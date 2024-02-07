import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Box, Text } from "rebass";
import StatusCard from "../components/StatusCard";

export default function AlbumStatus() {
    const overViewContainerStyle = css`
    display: flex;
    gap: 10px;

    flex-wrap: wrap;
  `;
  const tabularStyle = css`
    margin-top: 10px;
    width: 100%;
    padding: 12px 10px;
    color: #E1F2F7;
    background: #1F3044;
    border-radius: 10px;
  `;
  const titleStyle = css`
    margin-top: 15px;
    width: 100%;
  `;
  return (
    
    <Flex flexDirection="column">
    <Flex
        flexDirection="row"
        justifyContent="space-between"
        css={titleStyle}
    >
        <Box>
            <Text fontSize={3} fontWeight="bold">
                Album Name
            </Text>
        </Box>
        <Box>
            <Text fontSize={3} fontWeight="bold">
                Total Songs
            </Text>
        </Box>
    </Flex>
    <Flex
        flexDirection="row"
        justifyContent="space-between"
        css={tabularStyle}
    >
        <Box>
            <Text fontSize={3} fontWeight="bold">
                kajsajj
            </Text>
        </Box>
        <Box>
            <Text fontSize={3} fontWeight="regular">
                20
            </Text>
        </Box>
    </Flex>
</Flex>
  )
}
