import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../../lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  preview_text: string;
  tags: string;
  content: string;
  cover_photo: string;
  status: string;
  created_at: string;
}


export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!id) return;
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setPost(data);
      } catch (err) {
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-[200px] text-center font-['Poppins',sans-serif] text-gray-500">
          Loading post...
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-[200px] text-center font-['Poppins',sans-serif]">
          <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
          <Link to="/blogs" className="text-[#5aa4f4] hover:underline">Return to Blogs</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-[200px] pb-16 px-20">
        <div className="max-w-[900px] mx-auto">
          <Link
            to="/blogs"
            className="inline-flex items-center text-[#5aa4f4] font-['Poppins:SemiBold',sans-serif] text-[16px] mb-8 hover:underline"
          >
            ← Back to Blogs
          </Link>

          <div className="mb-8">
            <div className="inline-block bg-[#5aa4f4] text-white px-6 py-2 rounded-full font-['Inter:SemiBold',sans-serif] text-[14px] mb-4">
              {post.category}
            </div>
            <h1 className="font-['Poppins:Bold',sans-serif] text-[32px] sm:text-[40px] lg:text-[48px] text-[#100425] mb-4 leading-tight">
              {post.title}
            </h1>
            {post.preview_text && (
              <p className="font-['Poppins',sans-serif] text-[18px] sm:text-[20px] text-[#444] font-semibold italic leading-relaxed mb-4 border-l-4 border-[#5aa4f4] pl-4">
                "{post.preview_text}"
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4">
              <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#999]">
                Published on {formatDate(post.created_at)}
              </p>
              {post.tags && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.split(',').map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#eef5ff] text-[#5aa4f4] rounded-full text-[12px] font-semibold"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="w-full aspect-video bg-gray-100 rounded-3xl mb-12 overflow-hidden shadow-sm">
            {post.cover_photo ? (
              <img 
                src={post.cover_photo} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#5aa4f4] to-[#0e2d6e]" />
            )}
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="font-['Poppins:Regular',sans-serif] text-[16px] sm:text-[18px] text-[#333] leading-relaxed whitespace-pre-line">
              {post.content}
            </div>
          </div>

          <div className="mt-16 pt-8 border-t-2 border-gray-200">
            <h3 className="font-['Poppins:Bold',sans-serif] text-[28px] text-[#100425] mb-6">
              Share this article
            </h3>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-[#1877F2] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
              <button className="flex items-center gap-2 bg-[#1DA1F2] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                Twitter
              </button>
              <button className="flex items-center gap-2 bg-[#0077B5] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </button>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-[#5aa4f4] to-[#0e2d6e] rounded-3xl p-12 text-center">
            <h3 className="font-['Poppins:Bold',sans-serif] text-[32px] text-white mb-4">
              Ready to Transform Your Networking?
            </h3>
            <p className="font-['Poppins:Regular',sans-serif] text-[18px] text-white mb-8">
              Get your own Tapinfi NFC business card today
            </p>
            <Link
              to="/shop"
              className="inline-block bg-white text-[#0e2d6e] px-12 py-4 rounded-full font-['Poppins:SemiBold',sans-serif] text-[18px] hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
