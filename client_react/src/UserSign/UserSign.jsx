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
    return (
        <SignInForm />
    );
}

function SignUpPage() {
    const history = useHistory();

    const handleSubmit = async (formData) => {
        console.log('successsssssssssss');
        const response = await axios.post("http://localhost:5000/signup", formData);
        console.log(response);
        if (response.data.result === 'success'){
            history.push("/signin");
        }
    };

    return (
        <SignUpForm onSubmit={handleSubmit} />
    );
}
