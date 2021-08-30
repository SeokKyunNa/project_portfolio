import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchNameField from './SearchNameField';
import UserSimple from './UserSimple';
import * as UL from './UserListComponents';
import GetCurrentUser from '../Token/GetCurrentUser';


export default function UserList(props) {
    const [searchName, setSearchName] = useState('');
    const [userData, setUserData] = useState([]);

    const access_token = GetCurrentUser();

    const authAxios = axios.create({
        // baseURL: process.env.REACT_APP_API_URL,
        headers: {
            'Content-Type' : 'application/json',
            Accept : 'application/json',
            Authorization: `Bearer ${access_token}`
        }
    });
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${access_token}`;
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    useEffect(() => {
        (async function () {
            await axios.get(`${process.env.REACT_APP_API_URL}/userlist`)
                .then(response => {
                    console.log(response);
                    setUserData(response.data.user_list);
                })
                .catch(err => {
                    console.log(err);
                });
        })();
    }, []);

    async function getUsers(name) {
        if (!name || name === "") {
            return;
        }
        await axios.get(`${process.env.REACT_APP_API_URL}/userlist/${name}`)
            .then(response => {
                console.log(response);
                setUserData(response.data.user_list);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleChange = (value) => {
        setSearchName(value);
    }

    const handleClick = () => {
        if (searchName.length < 2) {
            alert("두 글자 이상 입력하세요.");
            return;
        }
        getUsers(searchName);
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleClick();
        }
    }

    return (
        <UL.Container>
            <UL.SearchWrapper>
                <SearchNameField value={searchName} onChange={handleChange} onKeyPress={handleKeyPress} />
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