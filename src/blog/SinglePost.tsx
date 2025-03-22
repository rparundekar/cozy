import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote, Block } from "@blocknote/react";

import Back from "./Back";

interface Post {
  id: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
}

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "Loading...",
      },
    ],
  });

  useEffect(() => {
    fetch("http://localhost:8000/posts")
      .then((response) => response.json())
      .then((data) => {
        const selectedPost = data.find((p: Post) => p.id === id);
        if (selectedPost) {
          setPost(selectedPost);
        }
      })
      .catch((error) => console.error("Error loading post:", error));
  }, [id]);

  useEffect(() => {
    if (post?.content) {
      // Convert content string into blocks
      const blocks: Block[] = post.content.split("\n").map((line) => {
        if (line.startsWith("#")) {
          const level = line.split(" ")[0].length;
          return {
            type: "heading",
            level,
            content: line.slice(level + 1),
          };
        } else {
          return {
            type: "paragraph",
            content: line,
          };
        }
      });

      editor.replaceBlocks(editor.document, blocks);
    }
  }, [post, editor]);

  if (!post) return <p className="text-center text-gray-500">loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen">
      <div className="py-5">
        <Link to="/blog">
          <Back />
        </Link>
      </div>
      <p className="text-gray-500 text-sm mb-6">{post.date}</p>
      <BlockNoteView editor={editor} />
    </div>
  );
};

export default SinglePost;
