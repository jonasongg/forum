import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axiosInstance from '../../api';
import { tPost, tComment } from '../types';
import Comment from './Comment';

const PostWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.02);
    padding: 20px 20px 15px 20px;
`;

const PostSubtext = styled.div`
    color: gray;
    font-weight: 400;
    font-size: small;
`;

const PostTitle = styled.div`
    color: black;
    font-weight: 600;
    font-size: larger;
`;

const PostBody = styled.div`
    color: black;
    font-size: medium;
`;

const Divider = styled.hr`
    border-top: 1px solid gray;
    margin: 0px 0px 0px 2%;
    width: 96%;
`;

const NoComments = styled.div`
    display: flex;
    justify-content: center;
    color: gray;
    font-size: small;
    margin-bottom: -5px;
`;

const tPost: React.FC = () => {
  const [post, setPost] = useState<tPost>();
  const [comments, setComments] = useState<tComment[]>([]);
  const params = useParams();

  useEffect(() => {
    axios
      .get(`/posts/${params.id}`)
      .then((rsp) => {
        setPost(rsp.data.data);
      })
      .catch(console.log);

    axiosInstance
      .get(`/posts/${params.id}/comments`)
      .then((rsp) => {
        setComments(rsp.data.data);
      })
      .catch(console.log);
  }, []);

  const commentsList = comments.map((comment) => (
    <Comment
      key={comment.attributes.body}
      attributes={comment.attributes}
    />
  ));

  return (
    <PostWrapper>
      <PostSubtext>
                Posted by {post?.attributes.user_username} •{' '}
        {post?.attributes.created_at}
      </PostSubtext>
      <PostTitle>{post?.attributes.title}</PostTitle>
      <PostBody>{post?.attributes.body}</PostBody>
      <Divider />
      {comments.length == 0 ? (
        <NoComments>no comments yet</NoComments>
      ) : (
        <div>{commentsList}</div>
      )}
    </PostWrapper>
  );
};

export default tPost;
