import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { apiTagSearch } from '../api';
import { StyledConfirmButton, Tag } from '../styles/SharedStyles';
import { tTag } from '../types';

type tSidebarTagsProps = {
    tags: tTag[];
};

const TagsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 13px;
`;

const TagWrapper = styled.button<{ selected: boolean }>`
    padding: 25px;
    font-size: medium;
    justify-content: flex-start;
    width: 100%;
    border: 2px solid ${(props) =>
    props.selected ? props.theme.subMain : props.theme.main};

    background-color: ${(props) =>
    props.selected ? props.theme.subMain : props.theme.background};
    }
`;

const ClearFilterButton = styled(StyledConfirmButton)`
    width: 70%;
`;

const SidebarTags: React.FC<tSidebarTagsProps> = (props) => {
  const [selectedTag, setSelectedTag] = useState('');
  const navigate = useNavigate();

  const handleTag = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const tagName = (e.target as HTMLButtonElement).innerText;
    if (selectedTag == tagName) {
      setSelectedTag('');
      navigate('/', { state: { tagName: '' } });
    } else {
      setSelectedTag(tagName);
      navigate('/', { state: { tagName: tagName } });
    }
  };

  const handleClear = () => {
    setSelectedTag('');
    navigate('/', { state: { tagName: '' } });
  };

  const tagList = props.tags.map((tag) => (
    <TagWrapper
      key={tag.id}
      onClick={(e) => handleTag(e)}
      selected={selectedTag == tag.attributes.name}
    >
      {tag.attributes.name}
    </TagWrapper>
  ));

  return tagList.length > 0 ? (
    <TagsWrapper>
      {tagList}
      <ClearFilterButton onClick={() => handleClear()}>
                CLEAR FILTER
      </ClearFilterButton>
    </TagsWrapper>
  ) : null;
};

export default SidebarTags;
