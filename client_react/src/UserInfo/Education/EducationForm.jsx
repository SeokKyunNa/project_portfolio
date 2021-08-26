import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as UI from '../UserInfoComponents';

export default function EducationForm({ user_id }) {
    const [eduData, setEduData] = useState([]);
    // const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        (async function () {
            // 학력 사항
            await axios.get(`http://127.0.0.1:5000/education/${user_id}`, {withCredentials: true})
                .then(response => {
                    // console.log(response);
                    setEduData(response.data);
                })
                .catch(err => {
                    console.log(err);
                })
        })();
    }, []);

    return (
        <UI.InfoWrapper>
            <h4>학력</h4>
            {eduData && eduData.map((edu, i) => (
                <div key={`edu-${i}`}>
                    <p>{edu.name}</p>
                    <p>{edu.major}</p>
                    <p>{edu.status}</p>
                {eduData.length > i+1 && <UI.Line />}
                </div>
            ))}
            <UI.ButtonWrapper>
                <UI.PencilButton />
            </UI.ButtonWrapper>
        </UI.InfoWrapper>
    );
}