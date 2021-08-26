import styled from "styled-components";
import editBtn from "../imgs/edit.png";
import checkBtn from "../imgs/checked.png";
import addBtn from "../imgs/add.png";

export const Container = styled.div`
    background-color: #dfe6ed;
    display: flex;
    justify-content: center;
    padding-bottom: 100px;
`

export const ProfileContainer = styled.div`
    /* background-color: #8181be; */
    width: 200px;
    padding: 0 30px 0 30px;
    & > div{
        margin-top: 30px;
    }
`

export const InfoContainer = styled.div`
    /* background-color: #557555; */
    width: 950px;
    padding: 0 30px 0 30px;
    & > div{
        margin-top: 30px;
    }
`

export const ProfileWrapper = styled.div`
    width: 80%;
    border-style: solid;
    padding: 0 30px 0 30px;
    border-radius: 10px;
    background-color: white;
`

export const InfoWrapper = styled.div`
    width: 80%;
    border-style: solid;
    padding: 0 30px 0 30px;
    border-radius: 10px;
    background-color: white;
`

export const Line = styled.hr`
    width: 100%;
`

export const ButtonWrapper = styled.div`
    text-align: right;
`

export const PencilButton = styled.button`
    width: 30px;
    height: 30px;
    border: 2px solid;
    border-color: gray;
    margin: 0 40px 10px 0;
    padding: 0;
    cursor: pointer;
    background: url(${editBtn});
    background-repeat: no-repeat;
    background-size: cover;
`
export const SaveButton = styled.button`
    width: 30px;
    height: 30px;
    border: 2px solid;
    border-color: green;
    margin: 0 10px 10px 0;
    cursor: pointer;
    background: url(${checkBtn});
    background-repeat: no-repeat;
    background-size: cover;
`

export const AddButton = styled.button`
    width: 30px;
    height: 30px;
    border: 2px solid;
    border-color: gray;
    margin: 0 0 10px 0;
    cursor: pointer;
    background: url(${addBtn});
    background-repeat: no-repeat;
    background-size: cover;
`

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export const Input = styled.input`
    height: 25px;
    margin: 4px 0px;
    border: 2px solid;
    border-color: gray;
    font-size: 15px;
`

export const PWrapper = styled.div`

`