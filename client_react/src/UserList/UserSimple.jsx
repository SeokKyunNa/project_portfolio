import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as UL from './UserListComponents';

const Container = styled.div`
    width: 80%;
    border-style: solid;
    padding: 0 30px 0 30px;
    border-radius: 10px;
    background-color: white;
`

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
        <Container>
            <h4>프로필(테스트용 텍스트)</h4>
            <p>{image}</p>
            <p>{name}</p>
            <p>{introduction}</p>
            <UL.Button onClick={handleClick}>정보 보기</UL.Button>
        </Container>
    );
}