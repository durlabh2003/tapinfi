import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import { products } from '../data/products';
import CustomizationWizard from '../components/customization/CustomizationWizard';

export default function ProductDetailPage() {
  const { id } = useParams();
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Header />
        <h1 className="text-3xl font-bold text-[#0e2d6e] mb-4">Product Not Found</h1>
        <Link to="/shop" className="text-[#5aa4f4] hover:underline">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <Header />
      
      <main className="pt-[120px] px-4 sm:px-8 lg:px-20 max-w-[1440px] mx-auto">
         {/* Wizard Container */}
         <div className="bg-white rounded-[40px] border border-gray-100 shadow-2xl p-6 lg:p-12 mb-10">
            <CustomizationWizard product={product} />
         </div>
      </main>
    </div>
  );
}
