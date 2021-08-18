import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as Sign from './SignComponents'


export default function SignInForm(props) {
    return (
        <Sign.Container>
            <form>
                <div>
                    <Sign.Label>아이디</Sign.Label>
                    <Sign.Input />
                </div>
                <div>
                    <Sign.Label>비밀번호</Sign.Label>
                    <Sign.Input type='password'/>
                </div>
                <Sign.Button>로그인</Sign.Button>
                <button>구글 계정으로 로그인</button>
            </form>
            <div>
                <Link to="/signup">회원가입하기</Link>
            </div>
        </Sign.Container>
    )
}
