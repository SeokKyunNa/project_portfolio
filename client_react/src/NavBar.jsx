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
    console.log("navbar context:", myIdContext.myId);
    console.log("현재 토큰:", GetCurrentUser());

    const handleLogout = async () => {
        await axios.post(`http://127.0.0.1:5000/signout`
            ,{ headers: { "Authorization": `Bearer ${GetCurrentUser()}` }}
            
        )
            .then(response => {
                console.log(response);
                myIdContext.setMyIdHandler("");
                localStorage.removeItem("myId");
                localStorage.removeItem("access_token");
                history.replace("/");
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
                    <StyledNavLink to="/info/:id">메인</StyledNavLink>
                    <StyledNavLink to="/userlist">네트워크 </StyledNavLink>
                    <StyledNavLink to="/signout" onClick={handleLogout}>로그아웃</StyledNavLink>
                </LoggedIn>
            )}
        </Nav>
    );
}
