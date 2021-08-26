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
`

const StyledNavLink = styled(NavLink)`
    margin-left: 15px;
`

const LoggedIn = styled.div`
`

export default function NavBar() {
    const history = useHistory();
    const myIdContext = useContext(UserContext);

    const access_token = GetCurrentUser();
    const api_url = "http://127.0.0.1:5000";
    // console.log("NavBar 현재 myId:", localStorage.getItem("myId"));

    const authAxios = axios.create({
        baseURL: api_url,
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })

    const handleLogout = async () => {
        await authAxios.post(`${api_url}/signout`)
            .then(response => {
                console.log(response);
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
