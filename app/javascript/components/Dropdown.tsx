import React from 'react';
import styled from 'styled-components';
import { BasicWrapper } from './styles/BasicWrapper';

const DropdownWrapper = styled.div`
    position: relative;
`;

const DropdownContent = styled(BasicWrapper)`
    position: absolute;

    padding: 10px;
    box-shadow: ${(props) => props.theme.boxShadowStrong};
`;

const Dropdown: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <DropdownWrapper>
      <DropdownContent>{children}</DropdownContent>
    </DropdownWrapper>
  );
};

export default Dropdown;
