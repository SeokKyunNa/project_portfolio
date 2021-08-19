import React from 'react';
import styled from 'styled-components';
import {
    ReducerAction,
    Link,
    Switch,
    BrowserRouter,
    Route,
    useHistory, 
    useLocation
} from 'react-router-dom';
import axios from 'axios';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';


export default function UserSign(props) {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <SignInPage />
                </Route>
                <Route exact path="/signin">
                    <SignInPage />
                </Route>
                <Route exact path="/signup">
                    <SignUpPage />
                </Route>
            </Switch>
        </BrowserRouter>
        
    )
}


function SignInPage() {
    const history = useHistory();

    const handleSubmit = async (formData) => {
        const response = await axios.post("http://localhost:5000/signin", formData);
        console.log(response);

        if (response.data.error){
            if (response.data.error.substring(0, 3) === '401'){
                alert('존재하지 않는 계정이거나, 잘못된 비밀번호입니다.');
            }
        }
        
        if (response.data.result === 'success'){
            alert('로그인 되었습니다.');
            history.push("/profile");
        }
    };

    return (
        <SignInForm onSubmit={handleSubmit} />
    );
}

function SignUpPage() {
    const history = useHistory();

    const handleSubmit = async (formData) => {
        const response = await axios.post("http://localhost:5000/signup", formData);
        console.log(response);

        if (response.data.error){
            if (response.data.error.substring(0, 3) === '409'){
                alert('중복된 ID입니다.');
            } else if (response.data.error.substring(0, 3) == '400'){
                alert('비밀번호를 확인해주세요.');
            }
        }
        
        if (response.data.result === 'success'){
            alert('회원가입이 완료되었습니다.');
            history.push("/signin");
        }
    };

    return (
        <SignUpForm onSubmit={handleSubmit} />
    );
}
