import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from './Card';
import { tPost } from '../types';
import { apiGetAllPosts, apiSearch } from '../api';
import { BasicWrapper, Divider, NoComments } from '../styles/SharedStyles';

type HomeProps = {
    searchInput: string;
};

const HomeDivider = styled(Divider)`
    :last-of-type {
        border: none;
    }
`;

const NoPosts = styled(NoComments)`
    margin-top: 20px;
    font-size: medium;
`;

const Home: React.FC<HomeProps> = (props) => {
  const [posts, setPosts] = useState<tPost[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (props.searchInput.length == 0) {
      (async () => {
        setPosts((await apiGetAllPosts()).data.data);
      })();
    } else {
      (async () => {
        const response = (await apiSearch(props.searchInput)).data.data;
        setPosts(response);
        setIsEmpty(response.length == 0);
      })();
    }
  }, [props.searchInput]);

  const postsList = posts.map((post) => (
    <>
      <Card
        key={post.attributes.title + post.id}
        id={post.id}
        attributes={post.attributes}
      />
      <HomeDivider />
    </>
  ));

  return isEmpty ? (
    <NoPosts>no posts found</NoPosts>
  ) : (
    <BasicWrapper>{postsList}</BasicWrapper>
  );
};

export default Home;
