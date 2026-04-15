import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const blogContent: { [key: number]: { title: string; date: string; category: string; content: string } } = {
  1: {
    title: 'The Future of Business Networking: Why NFC Cards Are Taking Over',
    date: 'March 15, 2026',
    category: 'Technology',
    content: `
The landscape of professional networking is undergoing a revolutionary transformation. Gone are the days when exchanging business cards meant fumbling through pockets for a crumpled piece of paper. Today, NFC (Near Field Communication) technology is reshaping how professionals connect, share information, and build meaningful relationships.

## What is NFC Technology?

NFC technology enables wireless communication between devices when they're brought within a few centimeters of each other. This same technology powers contactless payments and is now making waves in the business card industry. With a simple tap of an NFC-enabled card to a smartphone, you can instantly share your complete professional profile.

## Why Traditional Business Cards Are Becoming Obsolete

The average professional receives hundreds of business cards annually. Studies show that 88% of business cards are thrown away within a week. This not only represents a massive waste of resources but also countless lost networking opportunities. Traditional cards can get damaged, lost, or simply forgotten in a drawer.

## The Rise of Smart Business Cards

NFC business cards solve these problems elegantly. They're:
- Instantly shareable with a simple tap
- Always up-to-date (update your profile anytime)
- Environmentally friendly (one card lasts forever)
- More informative (link to portfolios, social media, videos)
- Trackable (see who viewed your profile)

## The Future is Here

As we move further into 2026, the adoption of NFC business cards is accelerating. Major corporations are switching their entire workforce to digital cards, and freelancers are discovering the competitive advantage they provide. The question is no longer "Should I switch?" but rather "When will I make the switch?"

## Making the Transition

Transitioning to NFC cards is simpler than you might think. Companies like Tapinfi offer ready-made solutions that can be customized to match your brand identity. The investment pays for itself quickly through saved printing costs and improved networking results.

The future of networking is here, and it fits in your wallet. Are you ready to make the switch?
    `
  }
};

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const post = blogContent[Number(id)] || blogContent[1];

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
            <h1 className="font-['Poppins:Bold',sans-serif] text-[48px] text-[#100425] mb-4">
              {post.title}
            </h1>
            <p className="font-['Inter:Regular',sans-serif] text-[16px] text-[#656565]">
              Published on {post.date}
            </p>
          </div>

          <div className="h-[400px] bg-gradient-to-br from-[#5aa4f4] to-[#0e2d6e] rounded-3xl mb-12"></div>

          <div className="prose prose-lg max-w-none">
            <div className="font-['Poppins:Regular',sans-serif] text-[18px] text-[#656565] leading-relaxed whitespace-pre-line">
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
