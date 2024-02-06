import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {Flex, Box, Text} from "rebass";

import { TbMenu2 } from "react-icons/tb";
import { IoIosClose } from "react-icons/io";

const MenuIcon = styled(TbMenu2)`
cursor: pointer;
font-size: 35px;
`;

export default function NavBar() {
    const NavStyle = css`
    background: #1D2228;
    margin: 10px 0px;
    padding: 10px 20px;
    border-radius: 10px;
    position: sticky;
    top: 0;
    height: 70px;
    `
    const SearchStyleInput = styled.input`
    background: #1D2228;
    color: #FB8122;
    padding: 10px;
    border: 3px solid #FB8122;
    border-radius: 10px;
    width: 300px;
    height: 50px;
    outline: none;
    `
    
    return(
        <>
            {/* Nav bar */}
            <Flex css={NavStyle} justifyContent={"space-between"}>
                    <Box>
                        <SearchStyleInput type="search" placeholder="Search here..."/>
                    </Box>
                    <Box>
                        <MenuIcon />
                    </Box>
                </Flex>
        </>
    )
}