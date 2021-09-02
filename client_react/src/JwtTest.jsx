import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GetCurrentUser } from './UserAuth/Auth';


export default function UserList() {
    const [name, setName] = useState('');

    const access_token = GetCurrentUser();

    // const authAxios = axios.create({
    //     // baseURL: process.env.REACT_APP_API_URL,
    //     headers: {
    //         'Content-Type' : 'application/json',
    //         // Authorization: `Bearer ${access_token}`
    //         Authorization: 'Bearer ' + access_token
    //     }
    // });
    axios.interceptors.request.use(
        config => {
            config.headers.Authorization = `Bearer ${access_token}`;
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    useEffect(() => {
        (async function () {
            await axios.get(`${process.env.REACT_APP_API_URL}/whoami`)
                .then(response => {
                    console.log('response:', response);
                    // console.log(response.data.name);
                    setName(response.data.name);
                })
                .catch(err => {
                    console.log('err:', err);
                    console.log('err.response:', err.response);
                });
        })();
    }, []);

    return (
        <div>
            <h1>My Id</h1>
            <p>{name}</p>
        </div>
    );
}