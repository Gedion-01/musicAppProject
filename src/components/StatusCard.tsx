import { css } from "@emotion/react";

import React from "react";
import { Flex, Box, Text } from "rebass";

type myComponentProp = {
  title: string;
  data: string;
};

const StatusCard: React.FC<myComponentProp> = ({ title, data }) => {
  const cardStyle = css`
  flex: 1;
  max-width: calc(33% - 10px);
  min-width: 150px; /* Minimum width */
  min-height: 150px; 
    gap: 20px;
    border: 2px solid #a8bcc3;
    padding: 15px;
    color: #1f3044;
    border-radius: 5px;
    @media screen and (max-width: 500px) { /* Adjust the breakpoint as needed */
    max-width: 100%; /* Maximum width for two cards per row with gap */
  }
    
  }
  `;

  return (
    <>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        css={cardStyle.styles}
      >
        <Box>
          <Text fontSize={3}>{title}</Text>
        </Box>
        <Box>
          <Text fontSize={8} fontWeight="bold">
            {data}
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default StatusCard;
