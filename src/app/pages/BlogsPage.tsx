import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import { supabase, isPlaceholder } from '../../lib/supabase';
import { MOCK_BLOGS } from '../data/blogs';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  preview_text: string;
  cover_photo: string;
  created_at: string;
  status: string;
}


const categoryColor: Record<string, string> = {
  Technology: '#5aa4f4', 'Tips & Tricks': '#7c6ff7', Networking: '#f47c5a',
  Sustainability: '#4ece7a', Design: '#f4c842', 'Case Studies': '#f45a9e',
  'Social Media': '#42d4c8', Security: '#f4944a', Events: '#a45af4', Branding: '#5ab8f4',
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      if (isPlaceholder) {
        setBlogs(MOCK_BLOGS);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('status', 'Published')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setBlogs(data || []);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-[110px]">
        {/* ── Hero ─────────────────────────────────────── */}
        <div className="px-4 sm:px-8 lg:px-20 py-12 text-center">
          <ScrollReveal animation="fade-up">
            <h1
              className="text-[28px] sm:text-[40px] lg:text-[48px] text-[#100425] mb-4"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}
            >
              Tapinfi Blog
            </h1>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={100}>
            <p
              className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#656565] max-w-[700px] mx-auto"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Insights, tips, and stories about the future of digital networking
            </p>
          </ScrollReveal>
        </div>

        {/* ── Blog Grid ────────────────────────────────── */}
        <div className="px-4 sm:px-8 lg:px-20 pb-16">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {loading ? (
              <div className="col-span-full text-center py-20 text-gray-500 font-['Poppins',sans-serif]">
                Loading amazing stories...
              </div>
            ) : blogs.length === 0 ? (
              <div className="col-span-full text-center py-20 text-gray-500 font-['Poppins',sans-serif]">
                No blog posts found. Check back soon!
              </div>
            ) : (
              blogs.map((post, i) => (
                <ScrollReveal key={post.id} animation="fade-up" delay={(i % 3) * 80}>
                  <Link
                    to={`/blog/${post.id}`}
                    className="group flex flex-col rounded-2xl overflow-hidden border border-gray-200
                      transition-all duration-300
                      hover:border-[#5aa4f4]
                      hover:-translate-y-2
                      hover:shadow-[0_16px_40px_rgba(90,164,244,0.15)]"
                  >
                    {/* Card banner */}
                    <div className="h-[220px] relative overflow-hidden bg-gray-100">
                      {post.cover_photo ? (
                        <img 
                          src={post.cover_photo} 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#5aa4f4] to-[#0e2d6e]" />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      {/* Animated shine on hover */}
                      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700
                          bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-12deg]" />
                      <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full shadow-sm">
                        <span
                          className="text-[11px] font-bold"
                          style={{ fontFamily: "'Inter', sans-serif", color: categoryColor[post.category] ?? '#0e2d6e' }}
                        >
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-5 flex flex-col flex-1 bg-white">
                      <div className="flex items-center gap-3 text-[#999] text-[12px] mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                        <span>{formatDate(post.created_at)}</span>
                      </div>
                      <h3
                        className="text-[16px] text-[#111315] mb-2 flex-1 line-clamp-2
                          group-hover:text-[#5aa4f4] transition-colors duration-200"
                        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
                      >
                        {post.title}
                      </h3>
                      <p className="text-[13px] text-[#656565] line-clamp-3 mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        {post.preview_text}
                      </p>
                      <span
                        className="text-[#5aa4f4] text-[13px] font-semibold group-hover:underline
                          flex items-center gap-1 transition-all duration-200"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        Read More
                        <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200">→</span>
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))
            )}
          </div>
        </div>

        {/* ── Newsletter ───────────────────────────────── */}
        <div className="px-4 sm:px-8 lg:px-20 pb-16">
          <ScrollReveal animation="zoom">
            <div className="max-w-[1440px] mx-auto bg-gradient-to-r from-[#5aa4f4] to-[#0e2d6e] rounded-3xl p-8 sm:p-12 text-center">
              <h2 className="text-[26px] sm:text-[36px] text-white mb-4 font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Stay Updated
              </h2>
              <p className="text-[15px] sm:text-[18px] text-white/90 mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Subscribe to our newsletter for the latest insights and updates
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-[540px] mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-full text-[15px] focus:outline-none focus:ring-2 focus:ring-white/60"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                />
                <button
                  className="bg-white text-[#0e2d6e] px-8 py-4 rounded-full text-[15px] font-semibold
                    hover:bg-gray-100 active:scale-95 transition-all duration-200 whitespace-nowrap"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
