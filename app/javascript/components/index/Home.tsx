import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Card from './Card';

const HomeWrapper = styled.div`
    flex-grow: 1;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.02);
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

  return <HomeWrapper>{postList}</HomeWrapper>;
};

export default Home;
