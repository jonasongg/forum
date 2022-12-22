import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Post } from '../types';

const PostWrapper = styled.div`
    width: 75%;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.02);
    padding: 20px;
`;

const PostSubtext = styled.div`
    color: gray;
    font-weight: 400;
    font-size: small;
    margin-bottom: 10px;
`;

const PostTitle = styled.div`
    color: black;
    font-weight: 600;
    font-size: larger;
    margin-bottom: 10px;
`;

const PostBody = styled.div`
    color: black;
    font-size: medium;
`;

const Post: React.FC = () => {
  const [post, setPost] = useState<Post>();
  const params = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/posts/${params.id}`)
      .then((rsp) => {
        setPost(rsp.data.data);
      })
      .catch(console.log);
  }, []);

  return (
    <PostWrapper>
      <PostSubtext>
                Posted by {post?.attributes.user.username} •{' '}
        {post?.attributes.created_at}
      </PostSubtext>
      <PostTitle>{post?.attributes.title}</PostTitle>
      <PostBody>{post?.attributes.body}</PostBody>
    </PostWrapper>
  );
};

export default Post;
