import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { tTag } from './types';

type TagProps = {
    tags: {
        data: tTag;
    }[];
};

const Tag = styled(Link)`
    display: flex;
    align-content: center;
    justify-content: center;

    background-color: ${(props) => props.theme.dark};
    color: white;
    font-size: 12px;
    font-weight: 600;
    border-radius: 5px;
    padding: 4px 7px;
    text-decoration: none;

    :hover {
        color: white;
    }
`;

const TagsWrapper = styled.div`
    display: flex;
    gap: 10px;
    padding: 5px;
`;

const TagList: React.FC<TagProps> = (props) => {
  const tagList = props.tags.map((tag) => (
    <Tag key={tag.data.attributes.name + tag.data.id} to="/">
      {tag.data.attributes.name}
    </Tag>
  ));

  return tagList.length > 0 ? <TagsWrapper>{tagList}</TagsWrapper> : null;
};

export default TagList;
