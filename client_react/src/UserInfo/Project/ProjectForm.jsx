import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import * as UI from '../UserInfoComponents';

export default function ProjectForm({ user_id }) {
    const [projectData, setProjectData] = useState([]);
    const [isEditing, setIsEdting] = useState(false);

    useEffect(() => {
        (async function (id) {
            // 프로젝트
            await axios.get(`http://127.0.0.1:5000/project/${user_id}`, {withCredentials: true})
                .then(response => {
                    // console.log(response);
                    setProjectData(response.data);
                })
                .catch(err => {
                    console.log(err);
                })
        })();
    }, []);
    
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
            <UI.PencilButton />
        </UI.InfoWrapper>
    );
}