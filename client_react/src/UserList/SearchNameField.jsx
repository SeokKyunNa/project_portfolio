import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    position: relative;
    margin-bottom: 12px;
`;

// 이곳에 Input의 스타일을 넣으세요
const Input = styled.input`
    padding: 11px 11px 11px 39px;
    border: 1px solid #c9cacc;
    border-radius: 4px;
    height: 46px;
    box-sizing: border-box;
    width: 100%;
    font-size: 14px;
    line-height: 22px;
    color: #7d7e80;
`;


export default function SearchNameField({ value, onChange }) {
    return (
        <Container>
            <Input
                placeholder="이름으로 검색"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </Container>
    );
}