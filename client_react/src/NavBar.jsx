import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './context/UserContext';
import GetCurrentUser from './Token/GetCurrentUser';

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

    const access_token = GetCurrentUser();

    const authAxios = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })

    const handleLogout = async () => {
        await authAxios.post(`${process.env.REACT_APP_API_URL}/signout`)
            .then(response => {
                myIdContext.setMyIdHandler("");
                localStorage.removeItem("myId");
                localStorage.removeItem("access-token");
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
                    <StyledNavLink to="/myinfo">메인</StyledNavLink>
                    <StyledNavLink to="/userlist">네트워크 </StyledNavLink>
                    <StyledNavLink to="/signout" onClick={handleLogout}>로그아웃</StyledNavLink>
                </LoggedIn>
            )}
        </Nav>
    );
}
