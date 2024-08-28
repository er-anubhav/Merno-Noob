import React, { useEffect, useState } from 'react';
function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div className="p-4"> 
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="border-b mb-4 pb-2">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
