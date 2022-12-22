import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type CardProps = {
    id: number;
    title: string;
    author: string;
    date: string;
};

const CardWrapper = styled.div`
    width: 100%;
    padding: 20px;

    :hover {
        background-color: #f9f9f9;
    }
`;

const CardTitle = styled.div`
    color: black;
    font-weight: 600;
    font-size: large;
`;

const CardSubtext = styled.div`
    color: gray;
    font-weight: 400;
    font-size: small;
`;

const Card: React.FC<CardProps> = (props: CardProps) => {
  return (
    <Link to={`/posts/${props.id}`} style={{ textDecoration: 'none' }}>
      <CardWrapper>
        <CardTitle>{props.title}</CardTitle>
        <CardSubtext>
                    by {props.author} • {props.date}
        </CardSubtext>
      </CardWrapper>
    </Link>
  );
};

export default Card;
