import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function Home() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null); // To track the post being edited
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  const handleEdit = (post) => {
    setEditingPost(post.id);
    setEditTitle(post.title);
    setEditDescription(post.description);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
  
    fetch(`http://localhost:5000/posts/${editingPost}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: editTitle, description: editDescription }),
    })
      .then((response) => {
        // Check if the response is JSON
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          return response.json(); // Parse JSON
        } else {
          return response.text(); // Parse as plain text
        }
      })
      .then((data) => {
        if (typeof data === 'string') {
          console.log("Update Response:", data); // Log plain text response
        } else {
          console.log("Update Response:", data); // Log JSON response
        }
  
        // Update the state only if the update was successful
        setPosts(
          posts.map((post) =>
            post.id === editingPost
              ? { ...post, title: editTitle, description: editDescription }
              : post
          )
        );
        setEditingPost(null); // Reset editing state
      })
      .catch((error) => console.error('Error updating post:', error));
  };
  

  const handleCancelEdit = () => {
    setEditingPost(null);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/posts/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setPosts(posts.filter((post) => post.id !== id));
        } else {
          throw new Error('Failed to delete post');
        }
      })
      .catch((error) => console.error('Error deleting post:', error));
  };

  return (
    <div className="p-4">
      <Link to="/new-post" className="bg-{#65676c} text-black px-4 py-2 rounded-2xl border-2 border-black">Create New Post</Link>
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="border-b mb-4 pb-2">
            {editingPost === post.id ? (
              <form onSubmit={handleUpdate}>
                <div className="mb-2">
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="ml-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p>{post.description}</p>
                <button
                  onClick={() => handleEdit(post)}
                  className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="mt-2 ml-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home
