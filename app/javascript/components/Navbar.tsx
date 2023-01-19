import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { StyledButton } from './StyledButton';

type NavbarProps = {
    setButton: React.Dispatch<React.SetStateAction<boolean>>;
};

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;

    position: sticky;
    top: 0;
    padding: 20px;
    padding-left: 15%;
    padding-right: 15%;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.02);
`;

const HomeLogo = styled(Link)`
    font-size: 1.5rem;
    font-weight: 600;
    font-family: Poppins;
    color: black;
    text-decoration: none;
    :hover {
        color: black;
    }
`;

const AlignRight = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;

    width: 90%;
`;

const SearchInput = styled.input`
    height: 40px;
    width: 30%;
    padding-left: 40px;
    background: #f5f5f5
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
        no-repeat 13px center;
    outline: none;
    border: 2px solid #f5f5f5;
    border-radius: 10px;

    :focus {
        border: 2px solid #e0e0e0;
        width: 80%;
    }

    transition: border 0.2s, width 0.5s;
`;

const Navbar: React.FC<NavbarProps> = (props) => {
  return (
    <Nav>
      <HomeLogo to="/">forum</HomeLogo>
      <AlignRight>
        <SearchInput placeholder="Search..." />
        <StyledButton onClick={() => props.setButton(true)}>
                    LOG IN
        </StyledButton>
      </AlignRight>
    </Nav>
  );
};

export default Navbar;
