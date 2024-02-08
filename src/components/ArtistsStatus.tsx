import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Box, Text } from "rebass";
import StatusCard from "./StatusCard";

function ArtistsStatus() {
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
  const titleStyle = css`
    margin-top: 15px;
    width: 100%;
  `;
  const textA = css`
    textalign: right;
  `;
  return (
    <Flex flexDirection="column">
      <Flex flexDirection="row" justifyContent="space-between" css={titleStyle}>
        <Box flex={2}>
          <Text fontSize={3} fontWeight="bold">
            Artist Name
          </Text>
        </Box>
        <Box flex={1}>
        <Flex justifyContent={"center"}>
            <Box>
              <Text fontSize={3} fontWeight="bold">
                Total Albums
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box flex={1}>
          <Flex justifyContent={"end"}>
            <Box>
              <Text fontSize={3} fontWeight="bold">
                Total Songs
              </Text>
            </Box>
          </Flex>
        </Box>
      </Flex>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        css={tabularStyle}
      >
        <Box flex={2}>
          <Text fontSize={3} fontWeight="bold">
            Abebe
          </Text>
        </Box>
        <Box flex={1}>
        <Flex justifyContent={"center"}>
            <Box>
              <Text fontSize={3} fontWeight="bold">
                34
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box flex={1}>
        <Flex justifyContent={"end"}>
            <Box>
              <Text fontSize={3} fontWeight="bold">
                34
              </Text>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

export default ArtistsStatus;
