import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as Sign from './SignComponents'


export default function SignInForm({ onSubmit }) {
    const initialValues = { id: "", password: "" };

    const SignInSchema = Yup.object().shape({
        id: Yup.string()
            .email("아이디는 이메일 형식이어야 합니다.")
            .required("아이디를 입력하세요."),

        password: Yup.string()
            .required("비밀번호를 입력하세요.")
            .min(8, "올바른 비밀번호를 입력하세요.")
    });

    const handleSubmit = (values) => {
        onSubmit(values)
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SignInSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                handleSubmit(values);
                setSubmitting(false);
            }}
        >
            {(formik) => {
                const {
                    isSubmitting,
                    errors,
                    touched,
                    isValid,
                    dirty
                } = formik;
                return (
                    <Sign.Container>
                        <Sign.StyledForm>
                            <Sign.TextWrapper>
                                <Sign.Label htmlFor="id">아이디</Sign.Label>
                                <Sign.Input 
                                    type="email"
                                    id="id"
                                    name="id"
                                    autoComplete="off"
                                    placeholder="아이디(이메일)을 입력하세요."
                                    className={errors.id && touched.id ? "input-error" : null}
                                />
                                <ErrorMessage name="id" component="p" className="error" />
                            </Sign.TextWrapper>
                            <Sign.TextWrapper>
                                <Sign.Label htmlFor="password">비밀번호</Sign.Label>
                                <Sign.Input 
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="비밀번호"
                                    className={errors.password && touched.password ? "input-error" : null}
                                />
                                <ErrorMessage name="password" component="p" className="error" />
                            </Sign.TextWrapper>
                            <Sign.Button
                                type="submit"
                                className={!(dirty && isValid)  || isSubmitting ? "disabled-btn" : ""}
                                disabled={!(dirty && isValid) || isSubmitting}
                            >로그인</Sign.Button>
                        </Sign.StyledForm>
                        <button>구글 계정으로 로그인</button>
                        <Link to="/signup">회원가입하기</Link>
                    </Sign.Container>
                );
            }}
        </Formik>
    )

}
