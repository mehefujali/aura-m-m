"use client";

import { useState, useEffect } from "react";

const Modal = ({ children, onClose }) => (
  <div
    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <div
      className="glass-card w-full max-w-3xl p-8 rounded-lg"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  </div>
);

const BlogForm = ({ onBack, onComplete, blogToEdit }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: blogToEdit?.title || "",
    author: blogToEdit?.author || "NexorZen Team",
    category: blogToEdit?.category || "",
    content: blogToEdit?.content || "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (imageFile) {
      data.append("file", imageFile);
    }

    const token = localStorage.getItem("accessToken");
    const url = blogToEdit
      ? `${process.env.NEXT_PUBLIC_API_URL}/blogs/${blogToEdit._id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/blogs`;
    const method = blogToEdit ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });
      const result = await res.json();
      if (!res.ok || !result.success)
        throw new Error(result.message || "Operation failed");

      setSuccess(`Blog ${blogToEdit ? "updated" : "created"} successfully!`);
      setTimeout(() => {
        onComplete();
        onBack();
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          {blogToEdit ? "Edit Blog Post" : "Create New Blog Post"}
        </h2>
        <button onClick={onBack} className="text-gray-400 hover:text-white">
          &larr; Back to List
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-h-[70vh] overflow-y-auto pr-2"
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Blog Title"
          required
          className="w-full p-3 rounded-lg bg-black/30 border border-white/10"
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author Name"
          required
          className="w-full p-3 rounded-lg bg-black/30 border border-white/10"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
          className="w-full p-3 rounded-lg bg-black/30 border border-white/10"
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Blog Content"
          required
          className="w-full p-3 rounded-lg bg-black/30 border border-white/10 h-32"
        ></textarea>
        <div>
          <label className="text-sm text-gray-400">Cover Image</label>
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="mt-2 w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-900/50 file:text-cyan-300 hover:file:bg-cyan-900"
          />
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-lg font-semibold text-black bg-[#00cdf3] rounded-lg hover:bg-white disabled:bg-gray-600"
        >
          {loading ? "Saving..." : blogToEdit ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default function ManageBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogs(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpenModal = (blog = null) => {
    setBlogToEdit(blog);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setBlogToEdit(null);
  };

  const handleDelete = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      const token = localStorage.getItem("accessToken");
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blogs/${blogId}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to delete blog post");
        fetchBlogs();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Blogs</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-[#00cdf3] text-black font-semibold px-4 py-2 rounded-lg hover:bg-white"
        >
          Create New Post
        </button>
      </div>

      <div className="bg-slate-900/50 rounded-lg overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Author</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-b border-slate-800">
                <td className="p-4">{blog.title}</td>
                <td className="p-4">{blog.author}</td>
                <td className="p-4 text-center space-x-4">
                  <button
                    onClick={() => handleOpenModal(blog)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <BlogForm
            onBack={handleCloseModal}
            onComplete={fetchBlogs}
            blogToEdit={blogToEdit}
          />
        </Modal>
      )}
    </div>
  );
}
