import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio/Portfolio";
import Activities from "./pages/Activities/Activities";
import Article from "./pages/Article/Article";
import ArticleDetail from "./pages/Article/ArticleDetail";
import Notice from "./pages/Notice";
import Project from "./pages/Project";
import Achievement from "./pages/Achievement";
import Access from "./pages/Access";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/article" element={<Article />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/project" element={<Project />} />
            <Route path="/achievement" element={<Achievement />} />
            <Route path="/access" element={<Access />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
