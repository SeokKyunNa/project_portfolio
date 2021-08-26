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
    const api_url = "http://127.0.0.1:5000";

    const authAxios = axios.create({
        baseURL: api_url,
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
            await authAxios.get(`${api_url}/userlist`)
                .then(response => {
                    console.log(response);
                    setUserData(response.data);
                })
                .catch(err => {
                    console.log(err);
                });
        })();
    }, []);

    async function getUsers(name) {
        await authAxios.get(`${api_url}/userlist/${name}`)
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