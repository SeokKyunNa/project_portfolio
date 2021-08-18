import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as Sign from './SignComponents'


export default function SignUpForm ({ onSubmit }) {
    const idRef = useRef();
    const passwordRef = useRef();
    const checkPasswordRef = useRef();
    const nameRef = useRef();

    const submitForm = (e) => {

        e.preventDefault();

        const id = idRef.current.value;
        const password = passwordRef.current.value;
        const checkPassword = checkPasswordRef.current.value;
        const name = nameRef.current.value;
        const formData = {
            id,
            password,
            "check_password": checkPassword,
            name
        };

        onSubmit(formData);
    };

    return (
        <Sign.Container>
            <form>
                <fieldset>
                    <div>
                        <Sign.Label htmlFor="id">아이디</Sign.Label>
                        <Sign.Input 
                            ref={idRef}
                            type="email"
                            id="id"
                            name="id"
                            autocomplete="off"
                            placeholder="아이디"
                            required
                        />
                    </div>
                    <div>
                        <Sign.Label htmlFor="password">비밀번호</Sign.Label>
                        <Sign.Input 
                            ref={passwordRef}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="비밀번호"
                            required
                        />
                    </div>
                    <div>
                        <Sign.Label htmlFor="checkPassword">비밀번호 확인</Sign.Label>
                        <Sign.Input 
                            ref={checkPasswordRef}
                            type="password"
                            id="checkPassword"
                            name="checkPassword"
                            placeholder="비밀번호 확인"
                            required
                        />
                    </div>
                    <div>
                        <Sign.Label htmlFor="name">이름</Sign.Label>
                        <Sign.Input 
                            ref={nameRef}
                            type="text"
                            id="name"
                            name="name"
                            autocomplete="off"
                            placeholder="이름"
                            required
                        />
                    </div>
                </fieldset>
                    <Sign.Button type="submit" onClick={submitForm}>회원가입</Sign.Button>
            </form>
            <div>
                <Link to="/signin">로그인하기</Link>
            </div>
        </Sign.Container>
        
    )
}