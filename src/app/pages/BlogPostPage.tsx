import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase, isPlaceholder } from '../../lib/supabase';
import { MOCK_BLOGS, BlogPost, BlogSection, parseContentToSections } from '../data/blogs';

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!id) return;

      if (isPlaceholder) {
        const found = MOCK_BLOGS.find((p) => p.id === id);
        if (found) {
          const finalSections = parseContentToSections(found.content, found.sections);
          setPost({ ...found, sections: finalSections });
        } else {
          setPost(null);
        }
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        // Parse sections if stored as JSON array/string, or parse raw markdown content
        let sections: BlogSection[] = [];
        if (Array.isArray(data.sections) && data.sections.length > 0) {
          sections = data.sections;
        } else if (typeof data.sections === 'string' && data.sections.trim()) {
          try {
            sections = JSON.parse(data.sections);
          } catch {
            sections = [];
          }
        }

        // Fallback: parse raw markdown content into structured sections
        if ((!sections || sections.length === 0) && data.content) {
          sections = parseContentToSections(data.content);
        }

        setPost({
          ...data,
          sections,
        });
      } catch (err) {
        console.error('Error fetching post:', err);
        const fallback = MOCK_BLOGS.find((p) => p.id === id);
        if (fallback) {
          const finalSections = parseContentToSections(fallback.content, fallback.sections);
          setPost({ ...fallback, sections: finalSections });
        } else {
          setPost(null);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  // Update SEO Document Title and Meta Description when post loads
  useEffect(() => {
    if (post) {
      document.title = post.meta_title || `${post.title} | Tapinfi Blog`;

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', post.meta_description || post.preview_text);
      }
    }
  }, [post]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
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
          Loading article...
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-[200px] pb-20 text-center font-['Poppins',sans-serif]">
          <h2 className="text-2xl font-bold mb-4 text-[#100425]">Article Not Found</h2>
          <Link to="/blogs" className="text-[#5aa4f4] hover:underline font-semibold">Return to Blogs</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const sections = post.sections || [];

  return (
    <div className="min-h-screen bg-white font-['Poppins',sans-serif]">
      <Header />

      <main className="pt-[140px] lg:pt-[160px] pb-20 px-4 sm:px-8 lg:px-20">
        <div className="max-w-[960px] mx-auto">
          {/* Back Button */}
          <Link
            to="/blogs"
            className="inline-flex items-center text-[#5aa4f4] font-semibold text-[15px] mb-8 hover:underline gap-1 transition-all"
          >
            ← Back to All Articles
          </Link>

          {/* Article Header & Info */}
          <header className="mb-10">
            <div className="inline-block bg-[#5aa4f4] text-white px-5 py-1.5 rounded-full font-['Inter:SemiBold',sans-serif] text-[13px] font-semibold mb-4 shadow-sm">
              {post.category}
            </div>

            <h1 className="text-[32px] sm:text-[42px] lg:text-[50px] text-[#100425] font-bold mb-6 leading-[1.2]">
              {post.title}
            </h1>

            {post.preview_text && (
              <p className="text-[17px] sm:text-[19px] text-[#555] font-medium italic leading-relaxed mb-6 border-l-4 border-[#5aa4f4] pl-5 py-1 bg-gradient-to-r from-[#eef5ff] to-transparent rounded-r-xl">
                "{post.preview_text}"
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6 text-sm text-[#888]">
              <div className="flex items-center gap-4">
                <span>Published on {formatDate(post.created_at)}</span>
              </div>
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
          </header>

          {/* Primary Cover Photo Hero */}
          <div className="w-full aspect-[21/10] bg-gray-100 rounded-3xl mb-12 overflow-hidden shadow-lg border border-gray-100 relative">
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

          {/* Table of Contents Box */}
          {sections.length > 0 && (
            <nav className="mb-14 p-6 sm:p-8 bg-[#f8fbff] border border-[#d8e8fe] rounded-3xl space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-[#0e2d6e] font-bold text-base uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#5aa4f4]" />
                Table of Contents ({sections.length} Modules)
              </div>
              <ol className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-medium">
                {sections.map((sec, idx) => (
                  <li key={sec.id || idx}>
                    <a
                      href={`#section-${idx + 1}`}
                      className="text-[#334155] hover:text-[#5aa4f4] transition-colors flex items-start gap-2 group"
                    >
                      <span className="font-mono text-[#5aa4f4] font-bold">{idx + 1}.</span>
                      <span className="group-hover:underline line-clamp-1">{sec.primaryHeading}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Render Multi-Sections */}
          {sections.length > 0 ? (
            <div className="space-y-16">
              {sections.map((sec, secIdx) => (
                <article
                  key={sec.id || secIdx}
                  id={`section-${secIdx + 1}`}
                  className="space-y-6 scroll-mt-28 border-t border-gray-100 pt-12 first:border-none first:pt-0"
                >
                  {/* Primary Heading (H2) with Serial Number */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#5aa4f4] bg-[#eef5ff] px-3 py-1 rounded-full">
                      Module #{secIdx + 1}
                    </span>
                    <h2 className="text-[26px] sm:text-[34px] font-bold text-[#100425] leading-tight flex items-start gap-3">
                      <span className="text-[#5aa4f4] font-mono">{secIdx + 1}.</span>
                      <span>{sec.primaryHeading}</span>
                    </h2>
                  </div>

                  {/* Section Image if present */}
                  {sec.sectionImage && (
                    <div className="rounded-3xl overflow-hidden border border-gray-200 aspect-video bg-gray-50 shadow-sm">
                      <img
                        src={sec.sectionImage}
                        alt={sec.imageCaption || sec.primaryHeading}
                        className="w-full h-full object-cover"
                      />
                      {sec.imageCaption && (
                        <p className="text-center text-xs text-gray-500 py-3 italic bg-gray-50 border-t border-gray-100">
                          {sec.imageCaption}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Secondary Headings (H3) and Sub-Headings (H4) */}
                  <div className="space-y-8 pl-1 sm:pl-3">
                    {sec.subheadings?.map((sub, subIdx) => (
                      <div key={sub.id || subIdx} className="space-y-4">
                        {/* Secondary Heading (H3) */}
                        <h3 className="text-[20px] sm:text-[24px] font-bold text-[#0e2d6e] flex items-center gap-2">
                          <span className="text-sm font-mono text-[#5aa4f4]">{secIdx + 1}.{subIdx + 1}</span>
                          {sub.title}
                        </h3>

                        {/* Supportive Content for H3 */}
                        {sub.content && (
                          sub.contentType === 'list' ? (
                            <ul className="space-y-2.5 pl-6 list-disc text-[#334155] text-[16px] sm:text-[17px] leading-relaxed font-normal">
                              {sub.content
                                .split('\n')
                                .map((line) => line.replace(/^[\s•\-\*]+/, '').trim())
                                .filter(Boolean)
                                .map((item, i) => (
                                  <li key={i} className="pl-1">{item}</li>
                                ))}
                            </ul>
                          ) : (
                            <p className="text-[#334155] text-[16px] sm:text-[17px] leading-relaxed whitespace-pre-wrap font-normal">
                              {sub.content}
                            </p>
                          )
                        )}

                        {/* Nested Child Sub-Headings (H4) */}
                        {sub.subHeadings && sub.subHeadings.length > 0 && (
                          <div className="space-y-5 pl-4 sm:pl-6 border-l-2 border-[#5aa4f4]/30 mt-4">
                            {sub.subHeadings.map((child, childIdx) => (
                              <div key={child.id || childIdx} className="space-y-2">
                                <h4 className="text-[17px] sm:text-[19px] font-bold text-[#1e293b] flex items-center gap-2">
                                  <span className="text-xs font-mono text-[#5aa4f4]">{secIdx + 1}.{subIdx + 1}.{childIdx + 1}</span>
                                  {child.title}
                                </h4>
                                {child.contentType === 'list' ? (
                                  <ul className="space-y-2 pl-6 list-disc text-[#475569] text-[15px] sm:text-[16px] leading-relaxed">
                                    {child.content
                                      .split('\n')
                                      .map((line) => line.replace(/^[\s•\-\*]+/, '').trim())
                                      .filter(Boolean)
                                      .map((item, i) => (
                                        <li key={i} className="pl-1">{item}</li>
                                      ))}
                                  </ul>
                                ) : (
                                  <p className="text-[#475569] text-[15px] sm:text-[16px] leading-relaxed whitespace-pre-wrap font-normal">
                                    {child.content}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="prose prose-lg max-w-none">
              <div className="font-['Poppins:Regular',sans-serif] text-[16px] sm:text-[18px] text-[#333] leading-relaxed whitespace-pre-line">
                {post.content}
              </div>
            </div>
          )}

          {/* Article Footer & Call to Action */}
          <div className="mt-16 pt-8 border-t-2 border-gray-200">
            <h3 className="text-[24px] font-bold text-[#100425] mb-6">
              Share this article
            </h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                className="flex items-center gap-2 bg-[#1877F2] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm font-semibold"
              >
                Facebook
              </button>
              <button
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}
                className="flex items-center gap-2 bg-[#1DA1F2] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm font-semibold"
              >
                Twitter
              </button>
              <button
                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                className="flex items-center gap-2 bg-[#0077B5] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm font-semibold"
              >
                LinkedIn
              </button>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-[#5aa4f4] to-[#0e2d6e] rounded-3xl p-8 sm:p-12 text-center shadow-xl text-white space-y-4">
            <h3 className="text-[28px] sm:text-[36px] font-bold leading-tight">
              Ready to Upgrade Your Enterprise Networking?
            </h3>
            <p className="text-[16px] sm:text-[18px] text-white/90 max-w-xl mx-auto">
              Get your custom Tapinfi NFC smart business card today and transform every connection.
            </p>
            <div className="pt-4">
              <Link
                to="/shop"
                className="inline-block bg-white text-[#0e2d6e] px-10 py-4 rounded-full text-[17px] font-bold hover:bg-gray-100 transition-all shadow-md hover:scale-105"
              >
                Shop Smart Cards Now
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
