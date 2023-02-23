import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { apiTagSearch } from './api';
import { Tag } from './styles/SharedStyles';
import { tTag } from './types';

type TagProps = {
    tags: {
        data: tTag;
    }[];
};

const TagsWrapper = styled.div`
    display: flex;
    gap: 10px;
    padding: 5px;
`;

const TagList: React.FC<TagProps> = (props) => {
  const navigate = useNavigate();

  const handleTag = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    navigate('/', {
      state: {
        tagName: (e.target as HTMLButtonElement).innerText,
      },
    });
  };
  const tagList = props.tags.map((tag) => (
    <Tag
      key={tag.data.attributes.name + tag.data.id}
      onClick={(e) => handleTag(e)}
    >
      {tag.data.attributes.name}
    </Tag>
  ));

  return tagList.length > 0 ? <TagsWrapper>{tagList}</TagsWrapper> : null;
};

export default TagList;
