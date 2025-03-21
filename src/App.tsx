import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blog from "@/components/blog/Blog";
import SinglePost from "@/components/blog/SinglePost";
import CozyPage from "@/pages/CozyPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CozyPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/post/:id" element={<SinglePost />} />
      </Routes>
    </Router>
  );
}

export default App;
