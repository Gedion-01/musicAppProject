import { css } from "@emotion/react";
import { Flex } from "rebass";
import Genre from "../components/Genre";

import { Link } from "react-router-dom";
import { useEffect } from "react";


export default function GenrePage() {
  const genreStyles = css`
    gap: 12px;
    flex-wrap: wrap;
  `;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Flex flexDirection={"column"}>
      <Flex flexDirection={"row"} css={genreStyles.styles} mt={2}>
        <Link to={"/genre/Ethiopian"} style={{textDecoration: "none", color: "#1f3044"}}>
          <Genre name={"Ethiopian"} imgUrl={"https://th.bing.com/th/id/OIP.gQTSRBvwGnns-qDT8v1AUgAAAA?rs=1&pid=ImgDetMain"} />
        </Link>
        <Link to={"/genre/Electronic"} style={{textDecoration: "none", color: "#1f3044"}}>
          <Genre name={"Electronic"} imgUrl={"https://th.bing.com/th/id/R.b67b8ed89dcc6935fa1154af885b1ba7?rik=SWfbQ8M6IYYmPA&pid=ImgRaw&r=0"} />
        </Link>
        <Link to={"/genre/Hip-Hop"} style={{textDecoration: "none", color: "#1f3044"}}>
          <Genre name={"Hip-Hop"} imgUrl={"https://img.redbull.com/images/c_crop,w_4100,h_2733,x_0,y_36,f_auto,q_auto/c_scale,w_1500/redbullcom/2017/07/12/d79980b1-b91e-4910-8d00-cae194d05222/hip-hop-and-rap-legends-public-enemy"} />
        </Link>
        <Link to={"/genre/Pop"} style={{textDecoration: "none", color: "#1f3044"}}>
          <Genre name={"Pop"} imgUrl={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYYG7I2XLgRt4BFCHD9gyGAgJPbD3JdWRr3A&usqp=CAU"} />
        </Link>
        <Link to={"/genre/Rock"} style={{textDecoration: "none", color: "#1f3044"}}>
          <Genre name={"Rock"} imgUrl={"https://th.bing.com/th/id/R.fcae5775a0bb7e5cd4aaff145ff7160e?rik=8QSI%2b61Y1zAIzA&pid=ImgRaw&r=0"} />
        </Link>
        <Link to={"/genre/R&B"} style={{textDecoration: "none", color: "#1f3044"}}>
          <Genre name={"R&B"} imgUrl={"https://th.bing.com/th/id/OIP.YJ0AR2SsQVtKgTftLeYxcQHaE8?rs=1&pid=ImgDetMain"} />
        </Link>
        <Link to={"/genre/Latin"} style={{textDecoration: "none", color: "#1f3044"}}>
          <Genre name={"Latin"} imgUrl={"https://th.bing.com/th/id/OIP.h8PwowNN2QU-CdirUjoXbAHaJQ?pid=ImgDet&w=144.15669205658324&h=180&c=7&dpr=1.3"} />
        </Link>
        <Link to={"/genre/Workout"} style={{textDecoration: "none", color: "#1f3044"}}>
          <Genre name={"Workout"} imgUrl={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyot4VuCZXxiGKXKgys1K-Oqedl6O-DO5paw&usqp=CAU"} />
        </Link>
      </Flex>
    </Flex>
  );
}
