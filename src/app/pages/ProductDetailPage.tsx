import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import FigmaShopPageWhiteGloss from '../../imports/ShopPage-1/ShopPage';
import FigmaShopPageMatteBlack from '../../imports/ShopPage/ShopPage';

// Product detail page that uses exact Figma frames based on product
export default function ProductDetailPage() {
  const { id } = useParams();
  
  // Determine which Figma frame to show based on product ID
  const renderProductPage = () => {
    switch(id) {
      case 'white-gloss':
        return <FigmaShopPageWhiteGloss />;
      case 'matte-black':
        return <FigmaShopPageMatteBlack />;
      case 'wooden':
        // For wooden, we'll use the matte black template for now
        return <FigmaShopPageMatteBlack />;
      default:
        return <FigmaShopPageWhiteGloss />;
    }
  };
  
  return (
    <div className="w-full min-h-screen flex justify-center bg-white relative">
      <Header />
      <div className="w-[1440px] relative pt-[110px]">
        {/* Inject the exact Figma frame based on product */}
        <div className="-mt-[110px]">
          {renderProductPage()}
        </div>
        
        {/* Add to Cart Button - functional link */}
        <Link 
          to="/shop" 
          className="absolute left-[85px] top-[885px] w-[286.37px] h-[52.658px] flex items-center justify-center rounded-[100px] bg-white border-2 border-[#5aa4f4] z-10 hover:bg-[#5aa4f4] transition-colors group"
          aria-label="Add to Cart"
        >
          <span className="bg-clip-text bg-gradient-to-r font-['Poppins:SemiBold',sans-serif] from-[#5aa4f4] text-[16px] text-transparent to-[#0e2d6e] group-hover:text-white">Add to Cart</span>
        </Link>
        
        {/* Buy Now Button - functional link */}
        <Link 
          to="/login" 
          className="absolute left-[403px] top-[885px] w-[286.37px] h-[52.658px] flex items-center justify-center rounded-[100px] z-10"
          style={{ backgroundImage: "linear-gradient(60.0131deg, rgb(90, 164, 244) 12.824%, rgb(14, 45, 110) 91.128%)" }}
          aria-label="Buy Now"
        >
          <span className="font-['Poppins:SemiBold',sans-serif] text-[16px] text-white">Buy Now</span>
        </Link>
        
        {/* Footer Shop Link */}
        <Link 
          to="/shop" 
          className="absolute left-[202px] top-[1997px] font-['Inter:Medium',sans-serif] font-medium text-[16px] text-white hover:text-[#5aa4f4] transition-colors z-10"
          aria-label="Shop"
        >
          Shop
        </Link>
      </div>
    </div>
  );
}
