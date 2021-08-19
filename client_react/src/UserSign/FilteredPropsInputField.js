/*
  formik 라이브러리에서 제공하는 Field 태그(input 태그에 handling 이벤트가 추가된)에 
  syteld-components를 바로 적용할 수 없어서 (const Input = styled.Field` ~~ `가 적용되지 않음)
  이것을 적용하기 위해 Filed 태그를 FilteredPropsInputField라는 이름으로 만들어줌
  
  - 참고 링크
  https://codesandbox.io/s/react-formik-styled-components-demo-89dci?file=/src/App.js
*/
import React from "react";
import { Field } from "formik";

function FilteredPropsInputField({ className, valid, error, ...props }) {
  return <Field className={className} {...props} />;
}

export default FilteredPropsInputField;
