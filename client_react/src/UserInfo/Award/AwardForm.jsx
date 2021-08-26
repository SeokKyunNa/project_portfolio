import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as UI from '../UserInfoComponents';

export default function AwardForm({ user_id }) {
    const [awardData, setAwardData] = useState([]);
    const [isEditing, setIsEdting] = useState(false);

    useEffect(() => {
        (async function () {
            // 수상 내역
            await axios.get(`${process.env.REACT_APP_API_URL}/award/${user_id}`, {withCredentials: true})
                .then(response => {
                    setAwardData(response.data);
                })
                .catch(err => {
                    console.log(err);
                })
        })();
    }, [user_id]);

    const handleClick = () => {
        setIsEdting(!isEditing);
    };

    const handleChange = (index) => (e) => {
        const { name, value } = e.target;
        let newAwardData = awardData.map((award, i) => {
            if (index === i) {
                return { ...award, [name]: value };
            } else {
                return award;
            }
        });
        setAwardData(newAwardData);
    };

    const addAwardData = () => {
        setAwardData([
            ...awardData,
            {
                award: '',
                details: ''
            }
        ]);
    };

    return (
        <>
            {isEditing ? (
                <UI.InfoWrapper>
                    <h4>수상 이력</h4>
                    <form>
                        {awardData && awardData.map((award, i) => (
                            <UI.InputWrapper key={`award-${i}`}>
                                <UI.Input name="award" type="text" value={award.award} placeholder="수상내역" onChange={handleChange(i)} />
                                <UI.Input name="details" type="text" value={award.details} placeholder="상세내역" onChange={handleChange(i)} />
                            {awardData.length > i+1 && <UI.Line />}
                            </UI.InputWrapper>
                        ))}
                    </form>
                    <UI.ButtonWrapper>
                        <UI.SaveButton onClick={handleClick} type="submit" />
                        <UI.AddButton onClick={addAwardData} />
                    </UI.ButtonWrapper>
                </UI.InfoWrapper>
            ) : (
                <UI.InfoWrapper>
                    <h4>수상 이력</h4>
                    {awardData && awardData.map((award, i) => (
                        <UI.PWrapper key={`award-${i}`}>
                            <p>{award.award}</p>
                            <p>{award.details}</p>
                        {awardData.length > i+1 && <UI.Line />}
                        </UI.PWrapper>
                    ))}
                    { user_id === localStorage.myId ? (
                        <UI.ButtonWrapper>
                            <UI.PencilButton onClick={handleClick} />
                        </UI.ButtonWrapper>
                    ) : (
                        <></>
                    )}
                </UI.InfoWrapper>
            )}
        </>
    );
}