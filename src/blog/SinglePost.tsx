import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import Back from "./Back";

interface Post {
  id: number;
  title: string;
  date: string;
  tags: string[];
  content: string;
}

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    console.log("ID recibido:", id);
    fetch("/blogData.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos cargados:", data);
        const selectedPost = data.posts.find((p: Post) => p.id === Number(id));
        console.log("Post encontrado:", selectedPost);
        setPost(selectedPost);
      })
      .catch((error) => console.error("Error cargando el post:", error));
  }, [id]);

  if (!post) return <p className="text-center text-gray-500">Cargando...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen">
      <div className="py-5">
        <Link to="/blog">
          <Back />
        </Link>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-6">{post.date}</p>
      <div className="flex flex-wrap gap-2 mb-6">
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
      <p className="text-gray-800 leading-relaxed">{post.content}</p>
    </div>
  );
};

export default SinglePost;
