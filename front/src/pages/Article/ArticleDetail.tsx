import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getBlogPostById, getBlogPosts } from "@services/blogService";
import type { BlogPost } from "@data/blogs";

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const blogPost = await getBlogPostById(Number(id));
      const allPosts = await getBlogPosts();
      setPost(blogPost);
      setRelatedPosts(allPosts.filter((p) => p.id !== Number(id)).slice(0, 2));
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            記事が見つかりません
          </h1>
          <p className="text-gray-600 mb-8">
            お探しの記事は存在しないか、削除された可能性があります。
          </p>
          <Link
            to="/blog"
            className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            ブログ一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-emerald-600 mb-8 transition-colors"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        戻る
      </button>

      {/* Article Header */}
      <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          <div className="flex items-center text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
            <span className="font-medium text-gray-700">{post.author}</span>
            <span className="mx-2">•</span>
            <time>{new Date(post.date).toLocaleDateString("ja-JP")}</time>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 text-sm bg-emerald-100 text-emerald-800 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {post.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">関連記事</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {relatedPosts.map((relatedPost) => (
            <Link
              key={relatedPost.id}
              to={`/blog/${relatedPost.id}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-emerald-600 transition-colors">
                {relatedPost.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {relatedPost.excerpt}
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <time>
                  {new Date(relatedPost.date).toLocaleDateString("ja-JP")}
                </time>
                <span className="mx-2">•</span>
                <span>{relatedPost.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Back to Blog List */}
      <div className="mt-12 text-center">
        <Link
          to="/blog"
          className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          ブログ一覧に戻る
        </Link>
      </div>
    </div>
  );
}
