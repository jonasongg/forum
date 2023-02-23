import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { apiGetTags } from '../api';
import { Divider } from '../styles/SharedStyles';
import { tTag } from '../types';
import SidebarTags from './SidebarTags';

const Side = styled.aside`
    display: flex;
    gap: 20px;
    align-items: center;
    flex-direction: column;

    padding: 30px;
    font-size: 15px;
    font-weight: 500;
    width: 25%;
    height: 100%;
    background-color: ${(props) => props.theme.background};
    border-radius: 10px;
    box-shadow: ${(props) => props.theme.boxShadow};
`;

const CreatePost = styled(Link)`
    font-size: medium;
    font-weight: 400;
    background: ${(props) => props.theme.dark}
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' fill='white' class='bi bi-plus' viewBox='0 0 16 16'%3E%3Cpath d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'%3E%3C/path%3E%3C/svg%3E")
        no-repeat 15px center;
    border-radius: 10px;
    padding: 8px 20px 8px 45px;
    color: white;
    text-decoration: none;

    box-shadow: ${(props) => props.theme.boxShadowStrong};
    :hover {
        background-color: ${(props) => props.theme.darkContrast};
        color: white;
    }
`;

const AlignLeft = styled.div`
    width: 100%;
`;

const SearchBy = styled.div`
    font-size: small;
    font-weight: 600;
    margin-bottom: 10px;
`;

const Sidebar: React.FC = () => {
  const [tags, setTags] = useState<tTag[]>([]);
  useEffect(() => {
    (async () => {
      setTags((await apiGetTags()).data.data);
    })();
  }, []);

  return (
    <Side>
      <CreatePost to="/create">Create a new post</CreatePost>
      <Divider />
      <AlignLeft>
        <SearchBy>SEARCH BY</SearchBy>
        <SidebarTags tags={tags} />
      </AlignLeft>
    </Side>
  );
};

export default Sidebar;
