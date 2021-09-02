import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import * as UI from '../UserInfoComponents';
import { authAxios } from '../../UserAuth/Auth';

export default function CertificateForm({ user_id }) {
    const [certData, setCertData] = useState([]);
    // const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        (async function (id) {
            // 자격증
            await authAxios.get(`/certificate/${user_id}`)
                .then(response => {
                    console.log(response);
                    setCertData(response.data.cert_list);
                })
                .catch(err => {
                    console.log(err);
                })
        })();
    }, [user_id]);
    return (
        <UI.InfoWrapper>
            <h4>자격증</h4>
            {certData && certData.map((cert, i) => (
                <div key={`cert-${i}`}>
                    <p>{cert.name}</p>
                    <p>{cert.issued_by}</p>
                    <p><Moment format="YYYY년 MM월">{cert.acquisition_date}</Moment> 취득</p>
                    {certData.length > i+1 && <UI.Line />}
                </div>
            ))}
            { user_id === localStorage.myId ? (
                <UI.ButtonWrapper>
                    <UI.PencilButton />
                </UI.ButtonWrapper>
            ) : (
                <></>
            )}
        </UI.InfoWrapper>
    );
}