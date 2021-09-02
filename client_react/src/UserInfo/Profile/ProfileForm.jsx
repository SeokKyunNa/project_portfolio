import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as UI from '../UserInfoComponents';

export default function ProfileForm({ user_id }) {
    const [profile, setProfile] = useState({
        name: '',
        image: '',
        introduction: ''
    });

    useEffect(() => {
        (async function (id) {
            // 프로필
            await axios.get(`${process.env.REACT_APP_API_URL}/profile/${user_id}`,)
                .then(response => {
                    console.log(response);
                    setProfile({
                        name: response.data.name,
                        image: response.data.image,
                        introduction: response.data.introduction
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        })();
    }, [user_id]);

    return (
        <UI.ProfileWrapper>
            <UI.ProfileImage src={profile.image}/>
            <p>{profile.name}</p>
            <p>{profile.introduction}</p>
            { user_id === localStorage.myId ? (
                <UI.ButtonWrapper>
                    <UI.PencilButton />
                </UI.ButtonWrapper>
            ) : (
                <></>
            )}
        </UI.ProfileWrapper>
    );
}