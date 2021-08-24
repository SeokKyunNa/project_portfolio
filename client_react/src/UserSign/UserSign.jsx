import React from 'react';
import {
    Switch,
    BrowserRouter,
    Route,
    useHistory
} from 'react-router-dom';
import axios from 'axios';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';


function SignInPage() {
    const history = useHistory();

    const handleSubmit = async (formData) => {
        await axios.post("http://localhost:5000/signin", formData)
            .then(response => {
                console.log(response);
                alert("로그인 되었습니다.");
                history.push("/info");
            })
            .catch(error => {
                console.log(error.response);
                if (error.response.status === 401){
                    if (error.response.data.message === 'invalidAccount'){
                        alert('존재하지 않는 계정입니다.');
                    } else if (error.response.data.message === 'wrongPassword'){
                        alert('잘못된 비밀번호입니다.');
                    } else {
                        alert('오류입니다.')
                    }
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

export default function UserSign(props) {
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