import React from 'react';
import styled from 'styled-components';

const Side = styled.aside`
    display: flex;
    gap: 20px;
    justify-content: center;

    font-size: 15px;
    font-weight: 500;
    width: 25%;
    height: 100%;
    background-color: ${(props) => props.theme.background};
    border-radius: 10px;
    box-shadow: ${(props) => props.theme.boxShadow};
`;

const CreateButton = styled.button`
    width: 75%;
    margin-top: 12%;

    font-size: medium;
    font-weight: 400;
    background: ${(props) => props.theme.dark}
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' fill='white' class='bi bi-plus' viewBox='0 0 16 16'%3E%3Cpath d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'%3E%3C/path%3E%3C/svg%3E")
        no-repeat 15px center;
    border-radius: 10px;
    padding: 8px 20px 8px 45px;
    color: white;

    box-shadow: ${(props) => props.theme.boxShadowStrong};
    :hover {
        background-color: ${(props) => props.theme.darkContrast};
    }
`;

const Sidebar: React.FC = () => {
  const handlePost = () => {
    // axiosInstance
    //   .post('/posts')
    //   .then((response) => console.log(response))
    //   .catch(console.log);
  };

  return (
    <Side>
      <CreateButton onClick={() => handlePost()}>
                Create a new post
      </CreateButton>
    </Side>
  );
};

export default Sidebar;
