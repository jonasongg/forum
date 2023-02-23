import axios from 'axios';

//Create (and export) axios instance to add interceptors in case of any actions that require authorisation
const axiosInstance = axios.create({
  baseURL: '/api/v1',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    config.headers = config.headers ?? {};
    config.headers['Authorization'] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const apiPostLogin = async (username: string, password: string) => {
  return axiosInstance.post('/login', {
    username: username,
    password: password,
  });
};

const apiGetUser = async (userId: number) => {
  return axiosInstance.get(`/users/${userId}`);
};

const apiGetAllPosts = async () => {
  return axiosInstance.get('/posts');
};

const apiGetPost = async (postId: string | undefined) => {
  return axiosInstance.get(`/posts/${postId}`);
};

const apiGetPostComments = async (postId: string | undefined) => {
  return axiosInstance.get(`/posts/${postId}/comments`);
};

type tApiPostComment = {
    body: string;
    user_id: number;
    post_id: number;
    parent_id?: number;
};

const apiPostComment = async (URL: string, data: tApiPostComment) => {
  return axiosInstance.post(URL, data);
};

const apiPutComment = async (URL: string, data: tApiPostComment) => {
  return axiosInstance.put(URL, data);
};

type tApiPostPost = {
    title: string;
    body: string;
    user_id: number;
};

const apiPostPost = async (data: tApiPostPost) => {
  return axiosInstance.post('/posts', data);
};

const apiPutPost = async (URL: string, data: tApiPostPost) => {
  return axiosInstance.put(URL, data);
};

const apiDelete = async (URL: string) => {
  return axiosInstance.delete(URL);
};

const apiSearch = async (query: string) => {
  return axiosInstance.post('/search', { query: query });
};

const apiTagSearch = async (tag: string) => {
  return axiosInstance.post('/tag', { tag: tag });
};

const apiGetTags = async () => {
  return axiosInstance.get('/tags');
};

export {
  axiosInstance,
  apiPostLogin,
  apiGetUser,
  apiGetAllPosts,
  apiGetPost,
  apiGetPostComments,
  apiPostComment,
  apiPutComment,
  apiPostPost,
  apiPutPost,
  apiDelete,
  apiSearch,
  apiTagSearch,
  apiGetTags,
};
