import React, { useState } from 'react';

function NewPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to create post');
        }
      })
      .then((data) => {
        console.log('Post created:', data);
        setMessage('Post created successfully!');
        setTitle('');
        setDescription('');
      })
      .catch((error) => {
        console.error('Error creating post:', error);
        setMessage('Failed to create post. Please try again.');
      });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-serif mb-4">Create a New Post</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}

export default NewPost;
