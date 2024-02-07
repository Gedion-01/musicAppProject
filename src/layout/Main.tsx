import { Outlet } from "react-router-dom"
import SideBar from "../components/SideBar"

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {Flex, Box, Text} from "rebass";

import NavBar from "../components/NavBar"

export default function Main() {

    const MainStyle = css`
    gap: 1rem;
    `
    const contentStyle = css`
    
    color: black;
    height: 100vh;
    
    border-radius: 10px;
    `
    
    
    return (
        <>
        <Flex css={MainStyle} alignItems={""}>
            <Box>
                <SideBar />
            </Box>
            <Box flex={1}>
                <NavBar />
                
                    <Outlet />
                
            </Box>
            
        </Flex>
        </>
    )
}