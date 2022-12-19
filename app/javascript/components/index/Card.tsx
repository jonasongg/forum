import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type CardProps = {
    title: string;
};

const CardWrapper = styled.div`
    width: 100%;
    padding: 20px;
    color: black;
    font-weight: 600;
    font-size: large;
    text-decoration: none;
    display: inline-block;

    :hover {
        background-color: #f9f9f9;
    }
`;

const Card: React.FC<CardProps> = (props: CardProps) => {
  return (
    <Link to="/post">
      <CardWrapper>{props.title}</CardWrapper>
    </Link>
  );
};

export default Card;
