import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as Sign from './SignComponents'


export default function SignUpForm ({ handleSubmit }) {
    const initialValues = { id: "", password: "", check_password: "", name: "" };

    const SignUpSchema = Yup.object().shape({
        id: Yup.string().email("아이디는 이메일 형식이어야 합니다.").required("아이디를 입력하세요."),

        password: Yup.string()
            .required("비밀번호를 입력하세요.")
            .min(8, "비밀번호는 8자 이상이어야 합니다."),

        check_password: Yup.string()
        .required("비밀번호 확인란 입력하세요.")
        .oneOf([Yup.ref('password'), null], "비밀번호가 일치하지 않습니다."),

        name: Yup.string()
            .required("이름을 입력하세요.")
            .matches(/^[a-zA-Z가-힣]*$/, {message: "영문 혹은 한글로 된 올바른 이름을 입력하세요."}),
    });

    // const formikSubmit = (values) => {
    //     handleSubmit(values)
    // };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SignUpSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                console.log("포믹온섭밋:", values);
                handleSubmit(values);
                setSubmitting(false);
            }}
        >
            {(formik) => {
                const {
                    isSubmitting,
                    errors,         // 각 필드의 유효성 검사 오류
                    touched,        // 필드가 터치 되었는지
                    isValid,        // 유효하다면 True, 아니면 False
                    dirty           // 폼 양식을 건드렸다면 True, 아니면 False
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
                                    placeholder="이메일 형식으로 입력하세요."
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
                            <Sign.TextWrapper>
                                <Sign.Label htmlFor="check_password">비밀번호 확인</Sign.Label>
                                <Sign.Input 
                                    type="password"
                                    id="check_password"
                                    name="check_password"
                                    placeholder="비밀번호 확인"
                                    className={errors.check_password && touched.check_password ? "input-error" : null}
                                />
                            <ErrorMessage name="check_password" component="p" className="error" />
                            </Sign.TextWrapper>
                            <Sign.TextWrapper>
                                <Sign.Label htmlFor="name">이름</Sign.Label>
                                <Sign.Input 
                                    type="text"
                                    id="name"
                                    name="name"
                                    autoComplete="off"
                                    placeholder="이름"
                                    className={errors.name && touched.name ? "input-error" : null}
                                />
                                <ErrorMessage name="name" component="p" className="error" />
                            </Sign.TextWrapper>
                            <Sign.Button 
                                type="submit"
                                className={!(dirty && isValid) || isSubmitting ? "disabled-btn" : ""}
                                disabled={!(dirty && isValid) || isSubmitting}
                            >회원가입</Sign.Button>
                        </Sign.StyledForm>
                    <div>
                        <Link to="/signin">로그인하기</Link>
                    </div>
                </Sign.Container>
                );
            }}
            
        </Formik>
    )
}