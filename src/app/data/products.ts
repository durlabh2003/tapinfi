import imgWhiteGloss from '../../imports/Frame1-1/e436e6b89b49a3d046b520fae180b3d8e2ef5396.png';
import imgMatteBlack from '../../imports/Frame1-1/b70470e67d7a77c2b65e8724e75b75f2497ba316.png';
import imgWooden from '../../imports/Frame1-1/1d69cb9a0b8c7c77c84dc373238e43c2a1424558.png';

export interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
  shortDesc: string;
  description: string;
  front_mock_photo?: string;
  back_photo?: string;
  card_type?: string;
  customization_options?: {
    frontFields?: string[];
    backFields?: string[];
  };
}

export const products: Product[] = [
  { 
    id: 'white-gloss', 
    name: 'PVC GLOSSY',  
    price: 499,  
    img: imgWhiteGloss,
    front_mock_photo: imgWhiteGloss,
    back_photo: imgWhiteGloss,
    shortDesc: 'Premium Smart Business Card | Multicolour Print | Custom Logo | QR Enabled | Eco-Friendly Digital Card',
    description: 'Make a lasting impression with the Tapinfi White Gloss NFC Card, a premium smart business card designed to showcase your brand in the most vibrant and professional way. Crafted with a smooth glossy white finish and high-definition multicolour printing, this card ensures your logo and details stand out with sharp clarity and rich colors.\n\nChoose Tapinfi to present yourself with confidence, creativity, and innovation - because your first impression deserves to be unforgettable.'
  },
  { 
    id: 'matte-black', 
    name: 'STEALTH PRO (MATTE)', 
    price: 799,  
    img: '/images/products/matte_black_front.png',
    front_mock_photo: '/images/products/matte_black_front.png',
    back_photo: '/images/products/matte_black_back.png',
    shortDesc: 'Premium Smart Business Card | Stealth Matte Finish | Silver Engraving | QR Enabled | Eco-Friendly Digital Card',
    description: 'Elevate your networking with the Tapinfi Stealth Pro Matte Black NFC Card. This sleek, minimalist design is perfect for professionals who want to make a sophisticated and understated impression. Featuring a high-end brushed matte finish and premium silver typography.\n\nLeave a lasting impact with a card that speaks volumes about your attention to detail and modern approach.'
  },
  { 
    id: 'royal-gold', 
    name: 'ROYAL GOLD EDITION', 
    price: 1499,  
    img: '/images/products/royal_gold_front.png',
    front_mock_photo: '/images/products/royal_gold_front.png',
    back_photo: '/images/products/royal_gold_back.png',
    shortDesc: 'Executive Smart Business Card | Real Gold Metal Finish | Black Enamel Etching | QR Enabled | Ultra-Premium Card',
    description: 'Experience the pinnacle of professional networking with the Tapinfi Royal Gold Edition. Crafted with a luxurious brushed gold metal finish and deep-etched black enamel branding. This card is designed for founders, executives, and leaders who demand excellence.\n\nMake every connection count with the most prestigious smart business card on the market.'
  },
  { 
    id: 'wooden',      
    name: 'WOODEN',      
    price: 1199, 
    img: imgWooden,
    front_mock_photo: imgWooden,
    back_photo: imgWooden,
    shortDesc: 'Premium Smart Business Card | Natural Wood Finish | Custom Engraving | QR Enabled | Sustainable Digital Card',
    description: 'Stand out naturally with the Tapinfi Wooden NFC Card. Crafted from authentic, sustainably sourced wood, each card features a unique grain pattern. Perfect for eco-conscious brands and individuals who want a warm, memorable, and highly tactile networking tool.\n\nCombine the beauty of nature with cutting-edge NFC technology to share your details instantly.'
  },
];
