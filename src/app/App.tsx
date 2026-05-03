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

import MarketingPage from './pages/MarketingPage';

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
            <Route path="/marketing" element={<MarketingPage />} />
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