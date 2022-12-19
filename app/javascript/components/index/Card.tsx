import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type CardProps = {
    title: string;
};

const CardWrapper = styled.div`
    width: 100%;
    border-radius: 10px;
    padding: 15px;
    color: black;
    font-weight: 600;
    text-decoration: none;
    display: inline-block;

    :hover {
        background-color: #f5f5f5;
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
