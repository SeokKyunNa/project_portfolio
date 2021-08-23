import React from 'react';
import styled from 'styled-components';
import { Link, Router, NavLink } from 'react-router-dom';

const Nav = styled.div`
    display: flex;

`

const StyledNavLink = styled(NavLink)`
    margin-left: 15px;
`

const LogedIn = styled.div`

`

export default function NavBar() {
    return (
        <Nav>
            <StyledNavLink to="/" className="nav-link">RacerIn</StyledNavLink>
            <LogedIn>
                <StyledNavLink to="/myinfo" className="nav-link">메인</StyledNavLink>
                <StyledNavLink to="/userlist" className="nav-link">네트워크 </StyledNavLink>
                <StyledNavLink to="/logout" className="nav-link">로그아웃</StyledNavLink>
            </LogedIn>
        </Nav>
    );
}


