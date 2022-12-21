import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Card from './Card';
import { Post, User } from '../types';

const HomeWrapper = styled.div`
    flex-grow: 1;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.02);
`;

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get('api/v1/posts.json')
      .then((rsp) => {
        setPosts(rsp.data.data);
        setUsers(rsp.data.included);
      })
      .catch((rsp) => console.log(rsp));
  }, [posts.length]); //Only call API again when posts change (change since posts can be edited)

  const getAuthor = (author: Post['relationships']['user']['data']) =>
    users.filter(
      (user) => user.id == author.id && user.type == author.type
    )[0].attributes.username;

  const postList = posts.map((post) => (
    <Card
      key={post.attributes.title}
      title={post.attributes.title}
      author={getAuthor(post.relationships.user.data)}
      date={post.attributes.created_at}
    />
  ));

  return <HomeWrapper>{postList}</HomeWrapper>;
};

export default Home;
