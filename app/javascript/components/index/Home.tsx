import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from './Card';
import { tPost } from '../types';
import { apiGetAllPosts } from '../api';
import { BasicWrapper } from '../styles/SharedStyles';

const Divider = styled.div`
    border-top: 1px solid ${(props) => props.theme.subMain};
    margin: 0px 0px 0px 2%;
    width: 96%;

    :last-of-type {
        border: none;
    }
`;

const Home: React.FC = () => {
  const [posts, setPosts] = useState<tPost[]>([]);

  useEffect(() => {
    (async () => {
      setPosts((await apiGetAllPosts()).data.data);
    })();
  }, []);

  const postsList = posts.map((post) => (
    <>
      <Card
        key={post.attributes.title + post.id}
        id={post.id}
        attributes={post.attributes}
      />
      <Divider />
    </>
  ));

  return <BasicWrapper>{postsList}</BasicWrapper>;
};

export default Home;
