import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

type CustomTextAreaProps = {
    isTextArea: boolean;
    placeholder: string;
    useFocusState?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    useInputState: [string, React.Dispatch<React.SetStateAction<string>>];
    useErrorState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    autoFocus: boolean;
};

const BaseStyle = css<{ isFocus: boolean; error: boolean }>`
    width: ${(props) => (props.isFocus ? '100%' : '95%')};
    background-color: ${(props) =>
    props.isFocus ? props.theme.background : props.theme.main};

    padding: 10px;
    resize: none;
    outline: none;
    border: 2px solid
        ${(props) =>
    props.isFocus
      ? props.error
        ? props.theme.subError
        : props.theme.subMain
      : props.theme.main};
    border-radius: 10px;
    box-shadow: ${(props) =>
    props.isFocus ? props.theme.boxShadow : props.theme.boxShadowStrong};

    transition: background-color 0.2s, width 0.2s, border 0.2s, height 0.4s;
`;

const StyledTextArea = styled.textarea`
    ${BaseStyle}
    height: ${(props) => (props.isFocus ? '200px' : '100px')};
`;

const StyledInput = styled.input`
    ${BaseStyle}
`;

const CustomTextArea: React.FC<CustomTextAreaProps> = (props) => {
  const [focus, setFocus] = props.useFocusState ?? useState(false);
  const [input, setInput] = props.useInputState;
  const [error, setError] = props.useErrorState;

  const handleChange = (
    event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const inputValue = (event.target as HTMLTextAreaElement).value;

    setInput(inputValue);
    if (inputValue.length != 0) {
      setError(false);
    }
  };

  const handleBlur = () => {
    setFocus(input.length != 0); //Unfocus only if length is 0
    setError(false);
  };

  useEffect(() => {
    setFocus(input.length != 0);
  }, [input]);

  const subProps = {
    placeholder: props.placeholder,
    onFocus: () => setFocus(true),
    onBlur: () => handleBlur(),
    onChange: (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => handleChange(e),
    autoFocus: props.autoFocus,
    isFocus: focus,
    error: error,
    value: input,
  };

  return (
    <>
      {props.isTextArea ? (
        <StyledTextArea {...subProps} />
      ) : (
        <StyledInput {...subProps} />
      )}
    </>
  );
};

export default CustomTextArea;
