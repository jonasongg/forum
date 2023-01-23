import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from './Card';
import { tPost } from '../types';
import { axiosInstance } from '../App';

const HomeWrapper = styled.div`
    background-color: ${(props) => props.theme.background};
    border-radius: 10px;
    box-shadow: ${(props) => props.theme.boxShadow};
`;

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
    axiosInstance
      .get('/posts')
      .then((rsp) => {
        setPosts(rsp.data.data);
      })
      .catch(console.log);
  }, [posts.length]); //Only call API again when posts change (change since posts can be edited)

  const postsList = posts.map((post) => (
    <>
      <Card
        key={post.attributes.title}
        id={post.id}
        title={post.attributes.title}
        body={post.attributes.body}
        author={post.attributes.user_username}
        date={post.attributes.created_at}
      />
      <Divider />
    </>
  ));

  return <HomeWrapper>{postsList}</HomeWrapper>;
};

export default Home;
