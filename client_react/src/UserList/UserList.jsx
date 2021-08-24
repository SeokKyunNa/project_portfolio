import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SearchNameField from './SearchNameField';
import UserSimple from './UserSimple';
import * as UL from './UserListComponents';


export default function UserList(props) {
    const [searchName, setSearchName] = useState('');
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        (async function () {
            await axios.get(`http://127.0.0.1:5000/userlist`)
                .then(response => {
                    setUserData(response.data);
                })
                .catch(err => {
                    console.log(err);
                });
        })();
    }, []);

    async function getUsers(name) {
        await axios.get(`http://127.0.0.1:5000/userlist/${name}`)
            .then(response => {
                setUserData(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleChange = (value) => {
        setSearchName(value);
    }

    const handleClick = () => {
        getUsers(searchName);
    }

    return (
        <UL.Container>
            <UL.SearchWrapper>
                <SearchNameField value={searchName} onChange={handleChange} />
                <UL.Button onClick={handleClick}>검색</UL.Button>
            </UL.SearchWrapper>
            <UL.ListWrapper>
                {userData && userData.map((user, i) => (
                    <UserSimple user_id={user.user_id} image={user.image} name={user.name} introduction={user.introduction} key={`user-${i}`}/>
                ))}
            </UL.ListWrapper>
        </UL.Container>
    );
}