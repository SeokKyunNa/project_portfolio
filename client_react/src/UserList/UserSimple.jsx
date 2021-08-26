import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import * as UL from './UserListComponents';

export default function UserSimple({
    user_id,
    image,
    name,
    introduction
}) {
    const history = useHistory();
    
    const handleClick = () => {
        history.push(`/info/${user_id}`)    
    };

    return (
        <UL.UserContainer>
            <h4>프로필(테스트용 텍스트)</h4>
            <UL.profileImage src="imgs/smile.png"/>
            {/* <p>{image}</p> */}
            <p>{name}</p>
            <p>{introduction}</p>
            <UL.Button onClick={handleClick}>정보 보기</UL.Button>
        </UL.UserContainer>
    );
}