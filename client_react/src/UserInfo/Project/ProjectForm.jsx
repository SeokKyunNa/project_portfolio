import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import * as UI from '../UserInfoComponents';

export default function ProjectForm({ user_id }) {
    const [projectData, setProjectData] = useState([]);
    // const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        (async function (id) {
            // 프로젝트
            await axios.get(`${process.env.REACT_APP_API_URL}/project/${user_id}`, {withCredentials: true})
                .then(response => {
                    setProjectData(response.data);
                })
                .catch(err => {
                    console.log(err);
                })
        })();
    }, [user_id]);
    
    return (
        <UI.InfoWrapper>
            <h4>프로젝트</h4>
            {projectData && projectData.map((project, i) => (
                <div key={`edu-${i}`}>
                    <p>{project.title}</p>
                    <p>{project.content}</p>
                    <p><Moment format="YYYY년 MM월">{project.start_date}</Moment> ~ <Moment format="YYYY년 MM월">{project.end_date}</Moment></p>
                    {projectData.length > i+1 &&<UI.Line />}
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