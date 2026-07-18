import imgGlossy from '../../imports/Frame1-1/glossy_card.png';
import imgSilverMatt from '../../imports/Frame1-1/silver_matt_card.png';
import imgGoldenMatt from '../../imports/Frame1-1/golden_matt_card.png';

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
    id: '09f566b0-8b7b-4146-b576-85e87409f703',
    name: 'Glossy',
    price: 499,
    img: imgGlossy,
    card_type: 'PVC',
    shortDesc: 'Premium Smart Business Card | Glossy Finish | Custom Logo | QR Enabled | Eco-Friendly Digital Card',
    description: 'Make a lasting impression with the Tapinfi Glossy NFC Card, a premium smart business card designed to showcase your brand in the most vibrant and professional way. Crafted with a smooth glossy white finish and high-definition printing, this card ensures your logo and details stand out with sharp clarity and rich colors.\n\nChoose Tapinfi to present yourself with confidence, creativity, and innovation - because your first impression deserves to be unforgettable.',
    customization_options: {
      frontFields: ['logo', 'name', 'designation', 'phone', 'email'],
      backFields: ['qr_code']
    }
  },
  {
    id: '29160909-60a4-4292-a96c-3d3faa737aab',
    name: 'Silver Matt',
    price: 699,
    img: imgSilverMatt,
    card_type: 'Matt',
    shortDesc: 'Premium Smart Business Card | Matte Finish | Custom Logo | QR Enabled | Eco-Friendly Digital Card',
    description: 'Elevate your networking with the Tapinfi Silver Matt NFC Card. This sleek, minimalist design is perfect for professionals who want to make a sophisticated and understated impression. Featuring precision silver printing on a premium matte surface.\n\nLeave a lasting impact with a card that speaks volumes about your attention to detail and modern approach.',
    customization_options: {
      frontFields: ['logo', 'name', 'designation', 'phone', 'email'],
      backFields: ['qr_code']
    }
  },
  {
    id: 'acb7c056-2459-4417-8302-6c30ee1922cf',
    name: 'Golden Matt',
    price: 699,
    img: imgGoldenMatt,
    card_type: 'Matt',
    shortDesc: 'Premium Smart Business Card | Matte Finish | Custom Logo | QR Enabled | Eco-Friendly Digital Card',
    description: 'Stand out with the Tapinfi Golden Matt NFC Card. Featuring a premium matte surface with striking gold details, this card is designed for individuals who want a warm, memorable, and highly tactile networking tool.\n\nCombine elegance with cutting-edge NFC technology to share your details instantly.',
    customization_options: {
      frontFields: ['logo', 'name', 'designation', 'phone', 'email'],
      backFields: ['qr_code']
    }
  },
];

