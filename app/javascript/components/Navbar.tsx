import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 70%;
    position: sticky;
    top: 0;
    padding: 20px;
    margin: 0px 15% 0px 15%;
    font-family: Segoe UI;
`;

const HomeLogo = styled.text`
    display: inline-block;
    font-size: 1.5rem;
    font-weight: 600;
    font-family: Poppins;
    text-decoration: none;
    color: black;
`;

const AlignRight = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    width: 90%;
`;

const SearchInput = styled.input`
    height: 40px;
    width: 30%;
    padding-left: 40px;
    background: #f2f2f2
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
        no-repeat 13px center;
    outline: none;
    border: 2px solid #f2f2f2;
    border-radius: 10px;
    :focus {
        border: 2px solid #e0e0e0;
        width: 80%;
    }
    transition: border 0.2s, width, 0.5s;
`;

const LoginButton = styled.div`
    width: 10%;
    text-align: center;
    color: #050505;
`;

// text-align: center;
// line-height: 30px;

// height: 35px;
// width: 15%;
// border: 2px solid #1560bd;
// border-radius: 5px;

const SignupButton = styled.div`
    width: 10%;
    text-align: center;
    color: #050505;
`;

const Navbar: React.FC = () => {
  return (
    <Nav>
      <Link to="/">
        <HomeLogo>forum</HomeLogo>
      </Link>
      <AlignRight>
        <SearchInput placeholder="Search..." />
        <SignupButton>Sign up</SignupButton>
        <LoginButton>Log in</LoginButton>
      </AlignRight>
    </Nav>
  );
};

export default Navbar;
