import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {Flex, Box, Text} from "rebass";

import { TbMenu2 } from "react-icons/tb";
import { IoIosClose } from "react-icons/io";

const MenuIcon = styled(TbMenu2)`
cursor: pointer;
font-size: 35px;
color: #E1F2F7;
`;

export default function NavBar() {
    const NavStyle = css`
    // background: #1F3044;
    background: #a8bcc3;
    margin: 10px 0px;
    padding: 10px 20px;
    border-radius: 10px;
    position: sticky;
    top: 0;
    height: 70px;
    `
    const SearchStyleInput = styled.input`
    // background: #1F3044;
    background: #a8bcc3;
    color: #1F3044;
    padding: 10px;
    border: 3px solid #E1F2F7;
    border-radius: 10px;
    width: 300px;
    height: 50px;
    outline: none;
    `
    
    return(
        <>
            {/* Nav bar */}
            <Flex css={NavStyle.styles} justifyContent={"space-between"}>
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