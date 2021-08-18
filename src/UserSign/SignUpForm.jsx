import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from "formik";
import styled from 'styled-components';
import * as Sign from './SignComponents'


export default function SignUpForm ({ onSubmit }) {
    const initialValues = { id: "", password: "", check_password: "", name: "" };

    const submitForm = (values) => {
        console.log(values);
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

    return (
        <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={submitForm}
        >
            {(formik) => {
                const {
                    values,         // 사용자 입력 값
                    handleChange,   // onChange 이벤트 처리
                    handleSubmit,   // onSubmit 이벤트 처리
                    errors,         // 각 필드의 유효성 검사 오류
                    touched,        // 필드가 터치 되었는지
                    handleBlur,     // onBlur 이벤트 처리
                    isValid,        // 유효하다면 True, 아니면 False
                    dirty           // 폼 양식을 건드렸다면 True, 아니면 False
                } = formik;
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
                                        value={values.id}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.id && touched.id ? "input-error" : null}
                                    />
                                    {/* 아이디 에러나 아이디 터치했을 때 */}
                                    {errors.id &&  touched.id && (
                                        <span className="error">{errors.id}</span>
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
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.password && touched.password ? "input-error" : null}
                                    />
                                    {/* 비밀번호 에러나 비밀번호 터치했을 때 */}
                                    {errors.password && touched.password && (
                                        <span className="error">{errors.password}</span>
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
                                        value={values.check_password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.check_password && touched.check_password ? "input-error" : null}
                                    />
                                {/* 비밀번호 확인 에러나 비밀번호 확인 터치했을 때 */}
                                {errors.check_password && touched.check_password && (
                                    <span className="error">{errors.check_password}</span>
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
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.name && touched.name ? "input-error" : null}
                                />
                                {/* 이름 에러나 이름 터치했을 때 */}
                                {errors.name && touched.name && (
                                    <span className="error">{errors.name}</span>
                                )}
                            </div>
                        </fieldset>
                            <Sign.Button 
                                type="submit"
                                className={dirty && isValid ? "" : "disabled-btn"}
                                disabled={!(dirty && isValid)}
                            >회원가입</Sign.Button>
                    </form>
                    <div>
                        <Link to="/signin">로그인하기</Link>
                    </div>
                </Sign.Container>
                );
            }}
            
        </Formik>
    )
}