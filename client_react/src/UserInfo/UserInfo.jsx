import React from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';
import ProfileForm from './Profile/ProfileForm.jsx';
import AwardForm from './Award/AwardForm.jsx';
import CertificateForm from './Certificate/CertificateForm.jsx';
import EducationForm from './Education/EducationForm.jsx';
import ProjectForm from './Project/ProjectForm.jsx';
import * as UI from './UserInfoComponents';


export default function UserInfo({ match, location }) {
    let { user_id } = useParams();
    let myId = "";
    if (match) {
        if (match.path === "/myinfo") {
            myId = localStorage.myId;
        }
    }
    
    return (
        <UI.Container>
            <UI.ProfileContainer>
                {/* 프로필 */}
                <ProfileForm user_id={match ? myId : user_id} />
            </UI.ProfileContainer>
            <UI.InfoContainer>
                {/* 학력 */}
                <EducationForm user_id={match ? myId : user_id} />
                {/* 수상이력 */}
                <AwardForm user_id={match ? myId : user_id} />
                {/* 프로젝트 */}
                <ProjectForm user_id={match ? myId : user_id} />
                {/* 자격증 */}
                <CertificateForm user_id={match ? myId : user_id} />
            </UI.InfoContainer>
        </UI.Container>
    );
}