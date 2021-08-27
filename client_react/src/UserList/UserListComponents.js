import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #dfe6ed;
    padding-bottom: 100px;
`

export const SearchWrapper = styled.div`
    width: 1000px;
    display: flex;
    justify-content: center;
    margin-top: 15px;

    & > button {
        width: 70px;
        margin-left: 15px;
    }
`

export const ListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 250px);
    grid-column-gap: 100px;
    grid-row-gap: 100px;
`

export const Button = styled.button`
    height: 46px;
    background-color: #6558f5;
    color: white;
    border-radius: 3px;
`

export const SearchContainer = styled.div`
    width: 75%;
    position: relative;
    margin-bottom: 12px;
`;

export const Input = styled.input`
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

export const ProfileImage = styled.img`
    height: 100px;
    width: 100px;
`

export const UserContainer = styled.div`
    width: 80%;
    height: 350px;
    border-style: solid;
    padding: 0 30px 0 30px;
    border-radius: 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    & > button{
        position: absolute;
        bottom: 15px;
    }
`