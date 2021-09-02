import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink, useHistory } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import { authAxios } from './UserAuth/Auth';

const Nav = styled.div`
    display: flex;
    height: 35px;
    border-bottom-width: 3px;
    border-bottom: solid;
    position: relative;

    & > a{
        position: absolute;
        left: 50px;
    }
`

const StyledNavLink = styled(NavLink)`
    margin-left: 15px;
    text-decoration: none;
    font-weight: bold;
    color: black;
`

const LoggedIn = styled.div`
    position: absolute;
    right: 150px;
`

export default function NavBar() {
    const history = useHistory();
    const myIdContext = useContext(UserContext);

    const handleLogout = async () => {
        await authAxios.post(`/signout`)
            .then(response => {
                console.log(response);
                myIdContext.setMyIdHandler("");
                localStorage.removeItem("myId");
                localStorage.removeItem("access_token");
                window.location.replace("/");
                
            })
            .catch(err => {
                console.log(err);
            })
    }
    
    return (
        <Nav>
            <StyledNavLink to="/">RacerIn</StyledNavLink>
            {myIdContext.myId && (
                <LoggedIn>
                    <StyledNavLink to="/whoami">WhoAmI</StyledNavLink>
                    <StyledNavLink to="/myinfo">메인</StyledNavLink>
                    <StyledNavLink to="/userlist">네트워크 </StyledNavLink>
                    <StyledNavLink to="/signout" onClick={handleLogout}>로그아웃</StyledNavLink>
                </LoggedIn>
            )}
        </Nav>
    );
}
