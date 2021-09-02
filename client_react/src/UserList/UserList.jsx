import React, { useState, useEffect } from 'react';
import SearchNameField from './SearchNameField';
import UserSimple from './UserSimple';
import * as UL from './UserListComponents';
import { authAxios } from '../UserAuth/Auth';


export default function UserList(props) {
    const [searchName, setSearchName] = useState('');
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        (async function () {
            await authAxios.get(`/userlist`)
                .then(response => {
                    console.log(response);
                    setUserData(response.data.user_list);
                })
                .catch(err => {
                    console.log('err:', err);
                    console.log('err.response:', err.response);
                });
        })();
    }, []);

    async function getUsers(name) {
        if (!name || name === "") {
            return;
        }
        await authAxios.get(`/userlist/${name}`)
            .then(response => {
                console.log(response);
                setUserData(response.data.user_list);
            })
            .catch(err => {
                console.log('err:', err);
                    console.log('err.response:', err.response);
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