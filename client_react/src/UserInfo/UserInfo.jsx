import React from 'react';
import { useParams } from 'react-router';
import ProfileForm from './Profile/ProfileForm.jsx';
import AwardForm from './Award/AwardForm.jsx';
import CertificateForm from './Certificate/CertificateForm.jsx';
import EducationForm from './Education/EducationForm.jsx';
import ProjectForm from './Project/ProjectForm.jsx';
import * as UI from './UserInfoComponents';

// axios.defaults.withCredentials = true;

export default function UserInfo() {
    let parameter = useParams();
    let user_id = parameter.user_id;
    
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