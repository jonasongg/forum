import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type CardProps = {
    id: number;
    title: string;
    body: string;
    author: string;
    date: string;
};

const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
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

const CardPreview = styled.div`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    color: black;
    font-size: 15px;
`;

const CardSubtext = styled.div`
    color: gray;
    font-weight: 400;
    font-size: small;
    margin-bottom: -5px;
`;

const Card: React.FC<CardProps> = (props: CardProps) => {
  return (
    <Link to={`/posts/${props.id}`} style={{ textDecoration: 'none' }}>
      <CardWrapper>
        <CardTitle>{props.title}</CardTitle>
        <CardPreview>{props.body}</CardPreview>
        <CardSubtext>
                    by {props.author} • {props.date}
        </CardSubtext>
      </CardWrapper>
    </Link>
  );
};

export default Card;
