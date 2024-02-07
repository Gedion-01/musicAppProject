import { useState, useEffect } from "react";
import { BiCategory } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";
import { TbMenu2 } from "react-icons/tb";
import { IoIosClose } from "react-icons/io";
// Styled component should be defined outside of the component function
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {Flex, Box, Text} from "rebass";

import { Link } from "react-router-dom";
//
//import { Outlet } from "react-router-dom";

const StyledIcon = styled(IoMdHome)`
  margin-right: 10px;
  font-size: 30px;
`;
const StyledIcon2 = styled(BiCategory)`
  margin-right: 10px;
  font-size: 30px;
`;
const StyledIcon3 = styled(IoStatsChart)`
  margin-right: 10px;
  font-size: 30px;
`;
const MenuIcon = styled(TbMenu2)`
cursor: pointer;
left: 40px;
top: 25px;
font-size: 35px;
`;
const CloseIcon = styled(IoIosClose)`

font-size: 40px;
cursor: pointer;
transition: all .5s ease;
`;

export default function SideBar() {
    const sideBarStyle = css`
    height: 100vh;
    position: sticky;
    top: 0;
    
  width: 350px;
  
  
  background: #1F3044;
  transition: all .5s ease;
  font-weight: bolder;

  @media (max-width: 768px) {
    display: none;
  }
  `
  const sideBarElement = css`
  font-size: 20px;
  color: #E1F2F7;
  
  padding: 7px;
  margin: 5px 16px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    color: #FB8122;
  }
  transition: .4s;
  `

  const header = css`
  font-size: 22px;
  color: #E1E2E2;
  text-align: center;
  
  `
  const menu = css`
  margin-top: 25px;
  padding: 0px 10px;
  `
    return<>
        <Flex flexDirection={"column"}  css={sideBarStyle}>
        <Flex flexDirection={"row"} justifyContent="space-between" alignItems="center" css={menu}>
          <Box><Text css={header}>My APP</Text></Box>
          
        </Flex>
        <Link to={'/'}>
        <Flex flexDirection={"row"} alignItems="center" css={sideBarElement}>
          
            <Box><StyledIcon /></Box>
            <Box>
              <Text>Home</Text>
            </Box>
          </Flex>
          </Link>
          <Link to={'/genre'}>
        <Flex flexDirection={"row"} alignItems="center" css={sideBarElement}>
            <Box><StyledIcon2 /></Box>
            <Box>
              <Text>Genre</Text>
            </Box>
          </Flex>
          </Link>
          <Link to={'/Statistics'}>
          <Flex flexDirection={"row"} alignItems="center" css={sideBarElement}>
            <Box><StyledIcon3 /></Box>
            <Box>
              <Text>Statistics</Text>
            </Box>
          </Flex>
          </Link>
        
      </Flex>
    </>
}