import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Box, Text } from "rebass";
import Genre from "../components/Genre";

type genre = {
    name: string;
    imgUrl: string
}
const genres : genre[] = [
    {
        name: "country/Ethiopia",
        imgUrl: "https://th.bing.com/th/id/OIP.gQTSRBvwGnns-qDT8v1AUgAAAA?rs=1&pid=ImgDetMain"
    },
    {
        name: "Electronic",
        imgUrl: "https://th.bing.com/th/id/R.b67b8ed89dcc6935fa1154af885b1ba7?rik=SWfbQ8M6IYYmPA&pid=ImgRaw&r=0"
    },
    {
        name: "Rap",
        imgUrl: "https://th.bing.com/th/id/OIP.UOQd78CO_FcqDqvVppOuYgHaDx?rs=1&pid=ImgDetMain"
    },
    {
        name: "Pop",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYYG7I2XLgRt4BFCHD9gyGAgJPbD3JdWRr3A&usqp=CAU"
    },
    {
        name: "Rock",
        imgUrl: "https://th.bing.com/th/id/R.fcae5775a0bb7e5cd4aaff145ff7160e?rik=8QSI%2b61Y1zAIzA&pid=ImgRaw&r=0"
    },
    {
        name: "R&B",
        imgUrl: "https://th.bing.com/th/id/OIP.YJ0AR2SsQVtKgTftLeYxcQHaE8?rs=1&pid=ImgDetMain"
    }
]

export default function GenrePage() {
    const genreStyles = css`
    gap: 12px;
    flex-wrap: wrap;
  `;
  
  return (
    <Flex flexDirection={"column"}>
      <Box>
        <Text fontSize={6} fontWeight="bold" mb={2}>
          Genre
        </Text>
      </Box>
      <Flex flexDirection={"row"} css={genreStyles.styles}>
      {
        genres.map((data) => {
            return <Genre name={data.name} imgUrl={data.imgUrl} />
        })
      }
      </Flex>
    </Flex>
  );
}
