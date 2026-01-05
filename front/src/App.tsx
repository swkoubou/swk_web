import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Activity from "./pages/Activity";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Notice from "./pages/Notice";
import Project from "./pages/Project";
import Achievement from "./pages/Achievement";
import Access from "./pages/Access";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/project" element={<Project />} />
            <Route path="/login" element={<Login />} />
            <Route path="/achievement" element={<Achievement />} />
            <Route path="/access" element={<Access />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
  ß;
}

export default App;
