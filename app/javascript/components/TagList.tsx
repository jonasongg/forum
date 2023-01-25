import React from 'react';
import styled from 'styled-components';
import { StyledConfirmButton } from './styles/SharedStyles';
import { tTag } from './types';

type TagProps = {
    tags: {
        data: tTag;
    }[];
};

const Tag = styled(StyledConfirmButton)`
    height: fit-content;
    width: fit-content;

    font-size: 12px;
    font-weight: 600;
    border-radius: 5px;
    padding: 4px 7px;
`;

const TagsWrapper = styled.div`
    display: flex;
    gap: 10px;
    padding: 5px;
`;

const TagList: React.FC<TagProps> = (props) => {
  const tagList = props.tags.map((tag) => (
    <Tag key={tag.data.attributes.name + tag.data.id}>
      {tag.data.attributes.name}
    </Tag>
  ));

  return tagList.length > 0 ? <TagsWrapper>{tagList}</TagsWrapper> : null;
};

export default TagList;
