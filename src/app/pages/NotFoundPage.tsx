import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-[200px] pb-16 px-20">
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="font-['Poppins:Bold',sans-serif] text-[120px] text-[#5aa4f4] mb-4">
            404
          </h1>
          <h2 className="font-['Poppins:Bold',sans-serif] text-[40px] text-[#100425] mb-6">
            Page Not Found
          </h2>
          <p className="font-['Poppins:Regular',sans-serif] text-[20px] text-[#656565] mb-12">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-[#5aa4f4] to-[#0e2d6e] text-white px-12 py-4 rounded-full font-['Poppins:SemiBold',sans-serif] text-[18px] hover:opacity-90 transition-opacity"
          >
            Go Home
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
