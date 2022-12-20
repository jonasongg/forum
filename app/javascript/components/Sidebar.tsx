import React from 'react';
import styled from 'styled-components';

const Side = styled.aside`
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.02);

    height: 100%;
    width: 25%;
`;

const Sidebar = () => {
  return <Side>sidebar</Side>;
};

export default Sidebar;
