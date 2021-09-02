import axios from 'axios';

export function GetCurrentUser() {
    let token = localStorage.getItem('access_token');

    return token;
}

const access_token = GetCurrentUser();

export const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type' : 'application/json',
        // Authorization: `Bearer ${access_token}`
        Authorization: 'Bearer ' + access_token
    }
});

