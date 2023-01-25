import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { tPost } from '../types';
import TagList from '../TagList';

type CardProps = {
    id: number;
    attributes: tPost['attributes'];
};

const CardWrapper = styled(Link)`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 20px;
    text-decoration: none;

    :hover {
        background-color: ${(props) => props.theme.main};
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
    color: ${(props) => props.theme.subText};
    font-weight: 400;
    font-size: small;
    margin-bottom: -5px;
`;

const Card: React.FC<CardProps> = (props: CardProps) => {
  return (
    <CardWrapper to={`/posts/${props.id}`}>
      <CardTitle>{props.attributes.title}</CardTitle>
      <CardPreview>{props.attributes.body}</CardPreview>
      <TagList tags={props.attributes.tags} />
      <CardSubtext>
                by {props.attributes.user_username} •{' '}
        {props.attributes.created_at}
      </CardSubtext>
    </CardWrapper>
  );
};

export default Card;
