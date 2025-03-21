import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  date: string;
  tags: string[];
  content: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/blogData.json")
      .then((response) => response.json())
      .then((data) => setPosts(data.posts))
      .catch((error) => console.error("Error cargando el blog:", error));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Blog
      </h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white  rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow"
          >
            <div className="p-6">
              <h2 className="text-3xl font-semibold mb-3 text-gray-900">
                {post.title}
              </h2>
              <p className="text-gray-500 text-sm mb-4">{post.date}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags &&
                  post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
              <p className="text-gray-800 leading-relaxed">
                {post.content.substring(0, 100)}...
              </p>
              <Link
                to={`/blog/post/${post.id}`}
                className="text-blue-600 font-semibold hover:underline mt-4 inline-block"
              >
                Leer más
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
