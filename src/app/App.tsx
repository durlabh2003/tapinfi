import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BlogsPage from './pages/BlogsPage';
import BlogPostPage from './pages/BlogPostPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import DeliveryDetailsPage from './pages/DeliveryDetailsPage';
import OrderSummaryPage from './pages/OrderSummaryPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import CustomizeCardPage from './pages/CustomizeCardPage';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';
import MarketingPage from './pages/MarketingPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import RefundPolicyPage from './pages/RefundPolicyPage';

export default function App() {
  return (
    <Router>
      <CartProvider>
        <ScrollToTop />
        <div className="size-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/customize/:id" element={<CustomizeCardPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/marketing" element={<MarketingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/refund-policy" element={<RefundPolicyPage />} />
            <Route path="/checkout/delivery" element={<DeliveryDetailsPage />} />
            <Route path="/checkout/summary" element={<OrderSummaryPage />} />
            <Route path="/checkout/success" element={<OrderSuccessPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <CartDrawer />
        </div>
      </CartProvider>
    </Router>
  );
}