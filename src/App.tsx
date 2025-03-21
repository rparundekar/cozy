import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CozyPage from "@/pages/CozyPage";
import Blog from "@/blog/Blog";
import SinglePost from "@/blog/SinglePost";
import NewPost from "./blog/NewPost";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CozyPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/new" element={<NewPost />} />
        <Route path="/blog/post/:id" element={<SinglePost />} />
      </Routes>
    </Router>
  );
}

export default App;
