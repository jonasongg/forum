import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from './AuthContext';

type PopupProps = {
    setLoginPrompted: React.Dispatch<React.SetStateAction<boolean>>;
};

const PopupWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.2);
`;

const PopupInner = styled.div`
    padding: 70px;
    z-index: 2;
    background-color: white;
    border-radius: 20px;
    width: 40%;

    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const PopupTitle = styled.div`
    font-weight: 600;
    font-size: xx-large;
`;

const UsernameInput = styled.input<{ error: boolean }>`
    width: 40%;
    height: 40px;
    border: none;
    outline: none;
    border-bottom: 2px solid ${(props) => (props.error ? '#fdeeee' : '#f5f5f5')};
    margin-top: 10px;
    :focus {
        border: none;
        border-bottom: 2px solid
            ${(props) => (props.error ? '#f59a9a' : '#e0e0e0')};
    }
    :focus::placeholder {
        color: #e0e0e0;
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

const ProceedButton = styled.button`
    color: #f5f5f5;
    background-color: #404040;

    :hover,
    :active {
        background-color: #282828;
    }
`;

const Popup: React.FC<PopupProps> = (props) => {
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
      props.setLoginPrompted(false);
    }
  };

  return (
    <PopupWrapper onClick={() => props.setLoginPrompted(false)}>
      <PopupInner onClick={(e) => e.stopPropagation()}>
        <PopupTitle>Log in</PopupTitle>
        <div>
                    Enter your existing username or a new one to create a new
                    user.
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
                            Username must be at least 5 characters long and
                            contain only alphanumeric characters.
            </ErrorMessage>
          )}
          <ButtonsWrapper>
            <ProceedButton type="submit">PROCEED</ProceedButton>
            <button onClick={() => props.setLoginPrompted(false)}>
                            CANCEL
            </button>
          </ButtonsWrapper>
        </form>
      </PopupInner>
    </PopupWrapper>
  );
};

export default Popup;
