import React, { useContext } from 'react';
import {
    Switch,
    BrowserRouter,
    Route,
    useHistory
} from 'react-router-dom';
import axios from 'axios';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { UserContext } from '../context/UserContext';


function SignInPage() {
    const history = useHistory();
    const myIdContext = useContext(UserContext);
    
    const handleSubmit = async (formData) => {
        await axios.post("http://localhost:5000/signin", formData)
            .then(response => {
                if (response.data.access_token){
                    localStorage.setItem('access_token', response.data.access_token)
                }
                // localStorage에 현재 로그인한 ID 저장
                localStorage.setItem('myId', formData.id);
                myIdContext.setMyIdHandler();
                
                // refresh 토큰을 localStorage에 같이 저장..?
                // if (response.data.refresh_token){
                //     localStorage.setItem('refresh_token', response.data.refresh_token)
                // }
                alert("로그인 되었습니다.");
                history.push("/myinfo");
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
                if (error.response.status === 401){
                    if (error.response.data.message === 'invalidAccount'){
                        alert('존재하지 않는 계정입니다.');
                    } else if (error.response.data.message === 'wrongPassword'){
                        alert('잘못된 비밀번호입니다.');
                    } else {
                        alert('오류입니다.')
                    }
                } else{
                    console.log(error);
                }
            });
    };

    return (
        <SignInForm onSubmit={handleSubmit} />
    );
}

function SignUpPage() {
    const history = useHistory();

    const handleSubmit = async (formData) => {
        await axios.post("http://localhost:5000/signup", formData)
            .then(response => {
                // console.log(response);
                alert('회원가입이 완료되었습니다.');
                history.push("/signin");
            })
            .catch(error => {
                // console.log(error.response);
                if (error.response.status === 409){
                    if (error.response.data.message === 'duplicateId'){
                        alert('중복된 ID입니다.');
                    }
                }
            });
    };

    return (
        <SignUpForm onSubmit={handleSubmit} />
    );
}

export default function UserSign() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <SignInPage />
                </Route>
                <Route path="/signin">
                    <SignInPage />
                </Route>
                <Route path="/signup">
                    <SignUpPage />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}