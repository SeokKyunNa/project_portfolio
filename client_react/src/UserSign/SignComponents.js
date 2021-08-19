import styled, { css } from "styled-components";
import FilteredPropsInputField from "./FilteredPropsInputField";

export const Container = styled.div`
  background-color: white;
  width: 410px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center
`;

export const TextWrapper = styled.div`
  
  + div {
    margin-top: 10px;
  }

  > Field {
    height: 30px;
  }
`;

export const Label = styled.h5`
  margin: 0;
`;

/* export const Input = styled.input`
  padding: 11px 11px 11px 39px;
`; */

export const Button = styled.button`
    background-color: #6558f5;
    color: #ffffff;
`;


export const Input = styled(FilteredPropsInputField)`
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5rem;
  font-style: normal;
  font-weight: 400;
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.75rem 0.75rem;

  &:focus,
  &:active {
    box-shadow: rgb(210, 213, 217) 0px 0px 2px 1px,
      rgb(227, 230, 232) 0px 0px 0px 3px;
    border: 1px solid rgb(26, 33, 43);
    outline: none;
  }

  /* Autocomplete styles in Chrome*/
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    background-color: white;
    border: 1px solid lightgrey;
    box-shadow: 0 0 0px 1000px #fff inset;
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: black;
  }

  ${({ valid }) =>
    valid &&
    css`
      border: 1px solid rgb(0, 156, 38);

      &:focus,
      &:active {
        border: 1px solid rgb(0, 156, 38);
        box-shadow: rgb(106, 237, 97) 0px 0px 2px 1px,
          rgb(177, 247, 160) 0px 0px 0px 3px;
        outline: none;
      }

      /* Autocomplete styles in Chrome*/
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        border: 1px solid rgb(0, 156, 38);
      }
    `}

  ${({ error }) =>
    error &&
    css`
      border: 1px solid rgb(191, 49, 12);
      outline: none;

      &:focus,
      &:active {
        box-shadow: rgb(244, 129, 116) 0px 0px 2px 1px,
          rgb(251, 178, 174) 0px 0px 0px 3px;
        border: 1px solid rgb(191, 49, 12);
        outline: none;
      }

      /* Autocomplete styles in Chrome*/
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        border: 1px solid rgb(191, 49, 12);
      }
    `}
`;