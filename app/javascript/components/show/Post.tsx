import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { apiGetPost, apiGetPostComments } from '../api';
import { AuthContext } from '../authentication/AuthContext';
import { BasicWrapper } from '../styles/SharedStyles';
import { tPost, tComment } from '../types';
import Comment from './Comment';
import CommentForm from './CommentForm';

const PostWrapper = styled(BasicWrapper)`
    display: flex;
    flex-direction: column;
    gap: 20px;

    padding: 20px 20px 15px 20px;
`;

const PostSubtext = styled.div`
    color: ${(props) => props.theme.subText};
    font-weight: 400;
    font-size: small;
`;

const PostTitle = styled.div`
    color: black;
    font-weight: 600;
    font-size: larger;
    margin: -10px 0px -10px 0px;
`;

const PostBody = styled.div`
    color: black;
    font-size: medium;
`;

const Divider = styled.div`
    border-top: 1px solid ${(props) => props.theme.subMain};
    margin: 0px 0px 0px 2%;
    width: 96%;
`;

const NoComments = styled.div`
    display: flex;
    justify-content: center;
    color: ${(props) => props.theme.subText};
    font-size: small;
    //margin-bottom: -5px;
`;

const tPost: React.FC = () => {
  const [post, setPost] = useState<tPost>();
  const [comments, setComments] = useState<tComment[]>([]);

  const params = useParams();
  const auth = useContext(AuthContext);

  const fetchPost = async () => {
    setPost((await apiGetPost(params.id)).data.data);
  };

  const fetchComments = async () => {
    const data = (await apiGetPostComments(params.id)).data.data;
    setComments(data);
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  const commentsList = comments.map((comment) => (
    <Comment
      key={comment.id}
      id={comment.id}
      attributes={comment.attributes}
      fetchComments={fetchComments}
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
      {/* {post?.attributes.user_username ==
                auth.user?.attributes.username && <AuthorisedActions />} */}
      <Divider />
      <CommentForm
        parentId={-1}
        originalInput=""
        URL={`/posts/${params.id}/comments`}
        fetchComments={fetchComments}
      />
      {comments.length == 0 ? (
        <NoComments>no comments yet</NoComments>
      ) : (
        <>{commentsList}</>
      )}
    </PostWrapper>
  );
};

export default tPost;
