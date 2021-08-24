import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileForm from './Profile/ProfileForm.jsx';
import AwardForm from './Award/AwardForm.jsx';
import CertificateForm from './Certificate/CertificateForm.jsx';
import EducationForm from './Education/EducationForm.jsx';
import ProjectForm from './Project/ProjectForm.jsx';

// axios.defaults.withCredentials = true;

export default function UserInfo(props) {
    const [profile, setProfile] = useState({
        name: '',
        image: '',
        introduction: ''
    });
    const [awardData, setAwardData] = useState([]);
    const [certData, setCertData] = useState([]);
    const [eduData, setEduData] = useState([]);
    const [projectData, setProjectData] = useState([]);

    useEffect(() => {
        (async function (id) {
            // 프로필
            await axios.get("http://127.0.0.1:5000/profile/test1@test.com", {withCredentials: true})
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
            // 수상 내역
            await axios.get("http://127.0.0.1:5000/award/test1@test.com", {withCredentials: true})
                .then(response => {
                    // console.log(response);
                    setAwardData(response.data);
                })
                .catch(err => {
                    console.log(err);
                })
            // 자격증
            await axios.get("http://127.0.0.1:5000/certificate/test1@test.com", {withCredentials: true})
                .then(response => {
                    // console.log(response);
                    setCertData(response.data);
                })
                .catch(err => {
                    console.log(err);
                })
            // 학력 사항
            await axios.get("http://127.0.0.1:5000/education/test1@test.com", {withCredentials: true})
                .then(response => {
                    // console.log(response);
                    setEduData(response.data);
                })
                .catch(err => {
                    console.log(err);
                })
            // 프로젝트
            await axios.get("http://127.0.0.1:5000/project/test1@test.com", {withCredentials: true})
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
        <div>
            {/* 프로필 */}
            <div>
                <h4>프로필(테스트용 텍스트)</h4>
                <ProfileForm image={profile.image} name={profile.name} introduction={profile.introduction}/>
            </div>
            {/* 학력 */}
            <div>
                <h4>학력</h4>
                {eduData && eduData.map((edu, i) => (
                    <div>
                    <EducationForm name={edu.name} major={edu.major} status={edu.status} key={`edu-${i}`} />
                    {eduData.length > i+1 &&
                        <hr />
                    }
                    </div>
                ))}
            </div>
            {/* 수상이력 */}
            <div>
                <h4>수상 이력</h4>
                {awardData && awardData.map((award, i) => (
                    <div>
                    <AwardForm award={award.award} details={award.details} key={`award-${i}`} />
                    {awardData.length > i+1 &&
                        <hr />
                    }
                    </div>
                ))}
            </div>
            {/* 프로젝트 */}
            <div>
            <h4>프로젝트</h4>
                {projectData && projectData.map((project, i) => (
                    <div>
                    <ProjectForm title={project.title} content={project.content} start_date={project.start_date} end_date={project.end_date} key={`edu-${i}`} />
                    {projectData.length > i+1 &&
                        <hr />
                    }
                    </div>
                ))}
            </div>
            {/* 자격증 */}
            <div>
            <h4>자격증</h4>
                {certData && certData.map((cert, i) => (
                    <div>
                    <CertificateForm name={cert.name} issued_by={cert.issued_by} acquisition_date={cert.acquisition_date} key={`cert-${i}`} />
                    {certData.length > i+1 &&
                        <hr />
                    }
                    </div>
                ))}
            </div>
        </div>
    );
}