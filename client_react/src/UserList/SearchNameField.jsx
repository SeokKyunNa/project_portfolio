import React from 'react';
import styled from 'styled-components';
import * as UL from './UserListComponents';

export default function SearchNameField({ value, onChange, onKeyPress }) {
    return (
        <UL.SearchContainer>
            <UL.Input
                placeholder="이름으로 검색"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyPress={(e) => onKeyPress(e)}
            />
        </UL.SearchContainer>
    );
}