import React from 'react';
import { useParams } from 'react-router';
import ProfileForm from './Profile/ProfileForm.jsx';
import AwardForm from './Award/AwardForm.jsx';
import CertificateForm from './Certificate/CertificateForm.jsx';
import EducationForm from './Education/EducationForm.jsx';
import ProjectForm from './Project/ProjectForm.jsx';
import * as UI from './UserInfoComponents';

// axios.defaults.withCredentials = true;

export default function UserInfo({ match, location }) {
    let parameter = useParams();
    let user_id = "";
    if (match.path === "/info/:user_id") {
        user_id = parameter.user_id;
        console.log("UserInfo /info/:user_id:", user_id);
    } else if (match.path === "/myinfo") {
        user_id = localStorage.myId;
        console.log("UserInfo /myinfo:", user_id);
    }

    if (!user_id || user_id === "") {
        return window.location.replace("/signin");
    }
    
    return (
        <UI.Container>
            <UI.ProfileContainer>
                {/* 프로필 */}
                <ProfileForm user_id={user_id} />
            </UI.ProfileContainer>
            <UI.InfoContainer>
                {/* 학력 */}
                <EducationForm user_id={user_id} />
                {/* 수상이력 */}
                <AwardForm user_id={user_id} />
                {/* 프로젝트 */}
                <ProjectForm user_id={user_id} />
                {/* 자격증 */}
                <CertificateForm user_id={user_id} />
            </UI.InfoContainer>
        </UI.Container>
    );
}