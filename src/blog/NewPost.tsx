import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useState } from "react";

export default function App() {
  const editor = useCreateBlockNote({});
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleSave = async () => {
    if (!editor) return;

    const newPost = {
      title,
      content: JSON.stringify(editor?.document), // Obtiene el contenido en formato JSON
      tags: String(tags)
        .split(",")
        .map((tag) => tag.trim()), // Convierte a string antes de dividir
      date: new Date().toISOString().split("T")[0],
    };

    const response = await fetch("http://localhost:8000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    if (response.ok) {
      alert("Post agregado exitosamente");
    } else {
      alert("Error al guardar el post");
    }
  };

  return (
    <div>
      <h1>Crear Nuevo Post</h1>
      <input
        type="text"
        placeholder="Título del post"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Etiquetas (separadas por comas)"
        value={tags.join(", ")}
        onChange={(e) =>
          setTags(e.target.value.split(",").map((tag) => tag.trim()))
        }
      />
      <BlockNoteView editor={editor} />
      <button onClick={handleSave}>Guardar Post</button>
    </div>
  );
}
