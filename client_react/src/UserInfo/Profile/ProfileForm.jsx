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
            await axios.get(`http://127.0.0.1:5000/profile/${user_id}`, {withCredentials: true})
                .then(response => {
                    // console.log(response);
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
    }, []);

    return (
        <UI.ProfileWrapper>
            <h4>프로필(테스트용 텍스트)</h4>
            <p>{profile.image}</p>
            <p>{profile.name}</p>
            <p>{profile.introduction}</p>
            <UI.ButtonWrapper>
                <UI.PencilButton />
            </UI.ButtonWrapper>
        </UI.ProfileWrapper>
    );
}