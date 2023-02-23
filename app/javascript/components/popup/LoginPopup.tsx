import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PopupContext } from './PopupContext';
import {
  ButtonsWrapper,
  PopupTitle,
  StyledConfirmButton,
} from '../styles/SharedStyles';
import { AuthContext } from '../authentication/AuthContext';

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const UsernamePWInput = styled.input<{ error: boolean }>`
    width: 40%;
    height: 40px;
    border: none;
    outline: none;
    border-bottom: 2px solid
        ${(props) => (props.error ? props.theme.error : props.theme.main)};
    margin-top: 10px;
    :focus {
        border: none;
        border-bottom: 2px solid
            ${(props) =>
    props.error ? props.theme.subError : props.theme.subMain};
    }
    :focus::placeholder {
        color: ${(props) => props.theme.subMain};
        transition: color 0.1s;
    }

    transition: border-bottom 0.2s;
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: small;
    margin-top: 7px;
`;

const LoginPopup: React.FC = () => {
  const [usernameError, setUsernameError] = useState(false);
  const [usernameValid, setUsernameValid] = useState(true);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordInput, setPasswordInput] = useState('');
  const [invalidLogin, setInvalidLogin] = useState(false);
  const auth = useContext(AuthContext);
  const popup = useContext(PopupContext);

  const handleUsernameChange = (event: React.FormEvent<HTMLInputElement>) => {
    setUsernameInput((event.target as HTMLInputElement).value);
  };
  const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    setPasswordInput((event.target as HTMLInputElement).value);
  };

  //Error when user tries submitting invalid username but cleared as soon as it becomes valid
  useEffect(() => {
    setUsernameValid(/[A-z0-9À-ž]{5,}/.test(usernameInput));
    if (usernameValid && usernameError) {
      setUsernameError(false);
    }
  }, [usernameInput]);

  //Error when user tries submitting invalid password but cleared as soon as it becomes valid
  useEffect(() => {
    setPasswordValid(/[A-z0-9]{5,}/.test(passwordInput));
    if (passwordValid && passwordError) {
      setPasswordError(false);
    }
  }, [passwordInput]);

  const handleProceed = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!usernameValid || !passwordValid) {
      setUsernameError(!usernameValid);
      setPasswordError(!passwordValid);
    } else {
      try {
        await auth.login(usernameInput, passwordInput);
      } catch (error) {
        setInvalidLogin(true);
      }
    }
  };

  return (
    <>
      <PopupTitle>Log in</PopupTitle>
      <div>
                Enter your existing username or a new one to create a new user.
      </div>
      <LoginForm onSubmit={handleProceed}>
        <UsernamePWInput
          placeholder="username"
          type="text"
          name="username"
          onChange={handleUsernameChange}
          error={usernameError || invalidLogin}
        />
        {usernameError && (
          <ErrorMessage>
                        Username must be at least 5 characters long and contain
                        only alphanumeric characters.
          </ErrorMessage>
        )}
        <UsernamePWInput
          placeholder="password"
          type="password"
          name="password"
          onChange={handlePasswordChange}
          error={passwordError || invalidLogin}
        />
        {passwordError && (
          <ErrorMessage>
                        Password must be at least 5 characters long and contain
                        only alphanumeric characters.
          </ErrorMessage>
        )}
        {invalidLogin && (
          <ErrorMessage>
                        Invalid login! Try again or create a new account.
          </ErrorMessage>
        )}
        <ButtonsWrapper>
          <StyledConfirmButton type="submit">
                        PROCEED
          </StyledConfirmButton>
          <button onClick={() => popup.setPopupPrompted(0)}>
                        CANCEL
          </button>
        </ButtonsWrapper>
      </LoginForm>
    </>
  );
};

export default LoginPopup;
