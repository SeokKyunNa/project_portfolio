import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as Sign from './SignComponents'


export default function SignUpForm ({ onSubmit }) {
    const initialValues = { id: "", password: "", check_password: "", name: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitForm = (e) => {
        e.preventDefault();
        console.log(formValues);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmitting(true);
    };

    const validate = (values) => {
        let errors = {};

        // 정규식 표현
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        // 이메일 값이 없을 때
        if (!values.id) {
            errors.id = "아이디를 입력해주세요.";
        } else if (!regex.test(values.id)) {
            errors.id = "올바른 이메일 형식을 입력해주세요.";
        }

        // 비밀번호 값이 없을 때
        if (!values.password) {
            errors.password = "비밀번호를 입력해주세요.";
        // 비밀번호의 길이가 8글자 이하일 때
        } else if (values.password.length < 8) {
            errors.password = "비밀번호는 8글자 이상이어야 합니다.";
        }

        // 비밀번호 확인 값이 없을 때
        if (!values.check_password) {
            errors.check_password = "비밀번호 확인란을 확인하여주세요.";
        }

        // 비밀번호와 비밀번호 확인이 서로 다를 때
        if (values.password !== values.check_password) {
            errors.check_password = "비밀번호를 다시 확인하여주세요.";
        }

        // 이름이 없을 때
        if (!values.name) {
            errors.name = "아이디를 입력해주세요.";
        }

        // 에러 반환
        return errors;
    };

    // 폼 태그에 값이 0이거나(?), isSubmitting이 false 상태일 때,
    // submitForm을 누름ㄴ [formErrors]가 마운트 되도록 설정
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submitForm();
        }
    }, [formErrors]);

    return (
        <Sign.Container>
            <form onSubmit={handleSubmit} noValidate>
                <fieldset>
                    <div>
                        <Sign.Label htmlFor="id">아이디</Sign.Label>
                        <Sign.Input 
                            type="email"
                            id="id"
                            name="id"
                            autocomplete="off"
                            placeholder="이메일 형식으로 입력하세요."
                            required
                            value={formValues.id}
                            onChange={handleChange}
                            className={formErrors.id && "input-error"}
                        />
                        {/* 에러 발생 시 */}
                        {formErrors.id && (
                            <span className="error">{formErrors.id}</span>
                        )}
                    </div>
                    <div>
                        <Sign.Label htmlFor="password">비밀번호</Sign.Label>
                        <Sign.Input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="비밀번호"
                            required
                            value={formValues.password}
                            onChange={handleChange}
                            className={formErrors.password && "input-error"}
                        />
                        {/* 에러 발생 시 */}
                        {formErrors.password && (
                            <span className="error">{formErrors.password}</span>
                        )}
                    </div>
                    <div>
                        <Sign.Label htmlFor="check_password">비밀번호 확인</Sign.Label>
                        <Sign.Input 
                            type="password"
                            id="check_password"
                            name="check_password"
                            placeholder="비밀번호 확인"
                            required
                            value={formValues.check_password}
                            onChange={handleChange}
                            className={formErrors.check_password && "input-error"}
                        />
                        {/* 에러 발생 시 */}
                        {formErrors.check_password && (
                            <span className="error">{formErrors.check_password}</span>
                        )}
                    </div>
                    <div>
                        <Sign.Label htmlFor="name">이름</Sign.Label>
                        <Sign.Input 
                            type="text"
                            id="name"
                            name="name"
                            autocomplete="off"
                            placeholder="이름"
                            required
                            value={formValues.name}
                            onChange={handleChange}
                            className={formErrors.name && "input-error"}
                        />
                        {/* 에러 발생 시 */}
                        {formErrors.name && (
                            <span className="error">{formErrors.name}</span>
                        )}
                    </div>
                </fieldset>
                    <Sign.Button type="submit">회원가입</Sign.Button>
            </form>
            <div>
                <Link to="/signin">로그인하기</Link>
            </div>
        </Sign.Container>
        
    )
}