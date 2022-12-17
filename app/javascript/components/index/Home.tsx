import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Home: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    axios.get('api/v1/posts.json')
      .then(response => setPosts(response.data.data))
      .catch(response => console.log(response))
  }, [posts.length]) //Only call API again when posts change (change since posts can be edited)

  const postList = posts.map(post => <li key={post.attributes.title}>{post.attributes.title}</li>)

  return (
    <ul>{postList}</ul>
  )
}

export default Home