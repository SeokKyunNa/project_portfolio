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
            await axios.get(`${process.env.REACT_APP_API_URL}/profile/${user_id}`, {withCredentials: true})
                .then(response => {
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
            <h4>프로필(테스트용 텍스트)</h4>
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