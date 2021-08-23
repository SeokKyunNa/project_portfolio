import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Nav = styled.div`
    display: flex;

`

const StyledNavLink = styled(NavLink)`
    margin-left: 15px;
`

const LoggedIn = styled.div`

`

export default function NavBar() {
    return (
        <Nav>
            <StyledNavLink to="/">RacerIn</StyledNavLink>
            <LoggedIn>
                <StyledNavLink to="/info/:id">메인</StyledNavLink>
                <StyledNavLink to="/userlist">네트워크 </StyledNavLink>
                <StyledNavLink to="/signout">로그아웃</StyledNavLink>
            </LoggedIn>
        </Nav>
    );
}


