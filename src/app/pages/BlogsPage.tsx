import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';

const blogPosts = [
  { id: 1,  title: 'The Future of Business Networking: Why NFC Cards Are Taking Over',      excerpt: 'Discover how NFC technology is revolutionizing the way professionals network and why traditional business cards are becoming obsolete.',                   date: 'March 15, 2026', category: 'Technology',    readTime: '5 min' },
  { id: 2,  title: '10 Creative Ways to Use Your Tapinfi Card',                             excerpt: 'Beyond just sharing contact details — explore innovative ways professionals are leveraging their smart business cards.',                                   date: 'March 12, 2026', category: 'Tips & Tricks', readTime: '4 min' },
  { id: 3,  title: 'How to Make a Lasting First Impression in 2026',                        excerpt: 'Learn the psychology behind memorable introductions and how digital business cards play a crucial role.',                                                   date: 'March 10, 2026', category: 'Networking',    readTime: '6 min' },
  { id: 4,  title: 'The Environmental Impact of Going Paperless',                           excerpt: 'Understanding how switching to digital business cards contributes to environmental sustainability.',                                                        date: 'March 8, 2026',  category: 'Sustainability', readTime: '5 min' },
  { id: 5,  title: 'Customizing Your Digital Profile: Best Practices',                      excerpt: 'A comprehensive guide to creating an engaging and professional digital business card profile.',                                                             date: 'March 5, 2026',  category: 'Design',        readTime: '7 min' },
  { id: 6,  title: 'NFC vs QR Codes: Which Is Better for Business Cards?',                 excerpt: 'A detailed comparison of contactless technologies and their applications in professional networking.',                                                      date: 'March 3, 2026',  category: 'Technology',    readTime: '5 min' },
  { id: 7,  title: 'Success Stories: How Tapinfi Transformed These Businesses',             excerpt: 'Real-world case studies of companies that revolutionized their networking strategy with smart cards.',                                                      date: 'Feb 28, 2026',   category: 'Case Studies',  readTime: '8 min' },
  { id: 8,  title: 'The Psychology of Color in Business Card Design',                       excerpt: 'How color choices impact perception and what your card design says about your brand.',                                                                      date: 'Feb 25, 2026',   category: 'Design',        readTime: '6 min' },
  { id: 9,  title: 'Integrating Social Media with Your Smart Business Card',                excerpt: 'Maximize your online presence by seamlessly connecting all your social platforms.',                                                                         date: 'Feb 22, 2026',   category: 'Social Media',  readTime: '5 min' },
  { id: 10, title: 'Security Features of Modern NFC Business Cards',                        excerpt: 'Understanding the encryption and privacy measures that protect your digital identity.',                                                                     date: 'Feb 20, 2026',   category: 'Security',      readTime: '6 min' },
  { id: 11, title: 'Networking Events in 2026: What to Expect',                             excerpt: 'How smart technology is changing the landscape of conferences and professional gatherings.',                                                                date: 'Feb 18, 2026',   category: 'Events',        readTime: '5 min' },
  { id: 12, title: 'Building Your Personal Brand with Digital Cards',                       excerpt: 'Strategies for using your smart business card as a powerful personal branding tool.',                                                                       date: 'Feb 15, 2026',   category: 'Branding',      readTime: '7 min' },
];

const categoryColor: Record<string, string> = {
  Technology: '#5aa4f4', 'Tips & Tricks': '#7c6ff7', Networking: '#f47c5a',
  Sustainability: '#4ece7a', Design: '#f4c842', 'Case Studies': '#f45a9e',
  'Social Media': '#42d4c8', Security: '#f4944a', Events: '#a45af4', Branding: '#5ab8f4',
};

export default function BlogsPage() {
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
            {blogPosts.map((post, i) => (
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
                  <div className="h-[170px] bg-gradient-to-br from-[#5aa4f4] to-[#0e2d6e] relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    {/* Animated shine on hover */}
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700
                        bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-12deg]" />
                    <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full">
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
                      <span>{post.date}</span><span>•</span><span>{post.readTime} read</span>
                    </div>
                    <h3
                      className="text-[16px] text-[#111315] mb-2 flex-1 line-clamp-2
                        group-hover:text-[#5aa4f4] transition-colors duration-200"
                      style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-[13px] text-[#656565] line-clamp-2 mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {post.excerpt}
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
            ))}
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
