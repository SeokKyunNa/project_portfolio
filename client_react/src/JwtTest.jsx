import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetCurrentUser from './Token/GetCurrentUser';


export default function UserList(props) {
    const [name, setName] = useState('');

    // const access_token = GetCurrentUser();
    const access_token = localStorage.getItem('access_token')

    const authAxios = axios.create({
        // baseURL: process.env.REACT_APP_API_URL,
        headers: {
            'Content-Type' : 'application/json',
            // Accept : 'application/json',
            // Authorization: `Bearer ${access_token}`
            Authorization: 'Bearer ' + access_token
        }
    });
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
            await authAxios.get(`${process.env.REACT_APP_API_URL}/jwttest`)
                .then(response => {
                    console.log('response:', response);
                    // console.log(response.data.name);
                    setName(response.data.name);
                })
                .then(data => {
                    console.log("This is the data your requested", data);
                })
                .catch(err => {
                    console.log('err:', err);
                    console.log('err.response:', err.response);
                });
        })();
    }, []);

    return (
        <div>
            <h1>JWT TEST</h1>
            <p>{name}</p>
        </div>
    );
}