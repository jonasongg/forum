import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PopupContext } from './PopupContext';
import {
  ButtonsWrapper,
  PopupTitle,
  StyledConfirmButton,
} from '../styles/SharedStyles';
import { AuthContext } from '../authentication/AuthContext';

const UsernameInput = styled.input<{ error: boolean }>`
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
  const [error, setError] = useState(false);
  const [valid, setValid] = useState(true);
  const [input, setInput] = useState('');
  const auth = useContext(AuthContext);
  const popup = useContext(PopupContext);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInput((event.target as HTMLInputElement).value);
  };

  //Error when user tries submitting invalid username but cleared as soon as it becomes valid
  useEffect(() => {
    setValid(/[A-z0-9À-ž]{5,}/.test(input));
    if (valid && error) {
      setError(false);
    }
  }, [input]);

  const handleProceed = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!valid) {
      setError(true);
    } else {
      auth.login(input);
      popup.setPopupPrompted(0);
    }
  };

  return (
    <>
      <PopupTitle>Log in</PopupTitle>
      <div>
                Enter your existing username or a new one to create a new user.
      </div>
      <form onSubmit={handleProceed}>
        <UsernameInput
          placeholder="username"
          type="text"
          name="username"
          onChange={handleChange}
          error={error}
        />
        {error && (
          <ErrorMessage>
                        Username must be at least 5 characters long and contain
                        only alphanumeric characters.
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
      </form>
    </>
  );
};

export default LoginPopup;
