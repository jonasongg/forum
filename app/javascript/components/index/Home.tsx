import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Card from './Card';

const PostsWrapper = styled.div`
    margin: 20px 15% 0px 15%;
    width: 70%;
    background-color: white;
    border-radius: 10px;
`;

const Home: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get('api/v1/posts.json')
      .then((response) => setPosts(response.data.data))
      .catch((response) => console.log(response));
  }, [posts.length]); //Only call API again when posts change (change since posts can be edited)

  const postList = posts.map((post) => (
    <Card key={post.attributes.title} title={post.attributes.title} />
  ));

  return <PostsWrapper>{postList}</PostsWrapper>;
};

export default Home;
