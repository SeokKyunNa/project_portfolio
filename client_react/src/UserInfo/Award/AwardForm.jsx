import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as UI from '../UserInfoComponents';

export default function AwardForm({ user_id }) {
    const [awardData, setAwardData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [postData, setPostData] = useState([]);
    const [patchData, setPatchData] = useState([]);

    useEffect(() => {
        (async function () {
            // 수상 내역 가져오기
            await axios.get(`${process.env.REACT_APP_API_URL}/award/${user_id}`, {withCredentials: true})
                .then(response => {
                    setAwardData(response.data.award_list);
                    // 원래 있던 데이터는 patchData에 넣어둠, 삭제할 때는 다시 처리
                    // setPatchData(response.data);
                })
                .catch(err => {
                    console.log(err);
                })
        })();
    }, [user_id]);

    const initialData = () => {
        setPostData([]);
        setPatchData([]);
    }

    // const checkData = () => {
    //     // 입력할 데이터와 수정할 데이터 분리
    //     awardData.map((award, i) => {
    //         award.award = award.award.trim();
    //         award.details = award.details.trim();

    //         if (!award.id || isNaN(award.id)) {
    //             // 수상 내역과 상세 내역 모두 입력된 것만 처리
    //             if ((award.award && award.award !== "") && (award.details && award.details !== "")) {
    //                 setPostData([
    //                     ...postData,
    //                     {
    //                         award: award.award,
    //                         details: award.details
    //                     }
    //                 ]);
    //             }
    //         } else {
    //             // 아이디가 있을 때 patch
    //             setPatchData([
    //                 ...patchData,
    //                 {
    //                     id: award.id,
    //                     award: award.award,
    //                     details: award.details
    //                 }
    //             ]);
                
                
    //         }
    //     });
    // }

    const handleClick = () => {
        setIsEditing(!isEditing);
        initialData();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsEditing(!isEditing);

        // post data와 patch data를 나누려고 했는데 실패함
        // checkData();

        if (isEditing) {
            user_id = localStorage.myId;
            // 데이터 입력
            if (postData) {
                let data = {
                    "user_id": user_id,
                    "award_list" : awardData
                }
                await axios.post(`${process.env.REACT_APP_API_URL}/award`, data)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
            // 데이터 수정
            if (patchData) {
                let award_list = {"award_list" : awardData}
                await axios.patch(`${process.env.REACT_APP_API_URL}/award`, award_list)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
        
    }

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

    const handleAdd = () => {
        setAwardData([
            ...awardData,
            {
                award: '',
                details: ''
            }
        ]);
        console.log(awardData);
        // setAwardData((current) => {
        //     const newList = [...current];
        //     newList.push({
        //         award: '',
        //         details: ''
        //     });
        //     return newList;
        // });
        // setPostData([
        //     ...postData,
        //     {
        //         award: '',
        //         details: ''
        //     }
        // ]);
    };

    const handleRemove = async (index) => {
        console.log("삭제:",index);

        // awardData[index].id 값이 있으면 axios.delete 요청 보내기
        if (awardData[index].id && awardData[index].id > 0) {
            await axios.delete(`${process.env.REACT_APP_API_URL}/award/${awardData[index].id}`, {withCredentials: true})
            .then(response => {
                console.log(response);
                setAwardData((current) => {
                    const newList = [...current];
                    newList.splice(index, 1);
                    return newList;
                })
                // 원래 있던 데이터는 patchData에 넣어둠, 삭제할 때는 다시 처리
                // setPatchData(response.data);
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            setAwardData((current) => {
                const newList = [...current];
                newList.splice(index, 1);
                return newList;
            });
        }
    }

    return (
        <>
            {isEditing ? (
                <UI.InfoWrapper>
                    <h4>수상 이력</h4>
                    <form id="awardForm" onSubmit={handleSubmit}>
                        {awardData && awardData.map((award, i) => (
                            <UI.InputWrapper key={`award-${i}`}>
                                <UI.Input name="award" type="text" value={award.award} placeholder="수상내역" onChange={handleChange(i)} />
                                <UI.Input name="details" type="text" value={award.details} placeholder="상세내역" onChange={handleChange(i)} />
                                <UI.DelButton type="button" onClick={()=>{handleRemove(i)}} />
                            {awardData.length > i+1 && <UI.Line />}
                            </UI.InputWrapper>
                        ))}
                    </form>
                    <UI.ButtonWrapper>
                        <UI.SaveButton form="awardForm" type="submit" />{/* onClick={handleClick} /> */}
                        <UI.AddButton onClick={handleAdd} />
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
