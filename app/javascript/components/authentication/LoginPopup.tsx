import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { StyledConfirmButton } from '../styles/StyledButtons';
import { AuthContext } from './AuthContext';

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

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin: 20px -10px -20px 0px;
`;

const LoginPopup: React.FC = () => {
  const [error, setError] = useState(false);
  const [valid, setValid] = useState(true);
  const [input, setInput] = useState('');
  const auth = useContext(AuthContext);

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
      auth.setLoginPrompted(false);
    }
  };

  return (
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
                    Username must be at least 5 characters long and contain only
                    alphanumeric characters.
        </ErrorMessage>
      )}
      <ButtonsWrapper>
        <StyledConfirmButton type="submit">PROCEED</StyledConfirmButton>
        <button onClick={() => auth.setLoginPrompted(false)}>
                    CANCEL
        </button>
      </ButtonsWrapper>
    </form>
  );
};

export default LoginPopup;
