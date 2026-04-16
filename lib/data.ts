export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Candles' | 'Cards' | 'Hampers';
  image: string;
  description: string;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Birthday Candle Set',
    price: 25,
    category: 'Candles',
    image: '/birthdayCandleSet.jpg',
    description: 'A delightful set of 5 scented birthday candles with vanilla and lavender fragrances.',
    rating: 4.8,
    reviews: 124
  },
  {
    id: '2',
    name: 'Luxury Vanilla Soy Candle',
    price: 32,
    category: 'Candles',
    image: '/LuxuryVCandle.webp',
    description: 'Hand-poured soy candle with rich vanilla notes, 40-hour burn time.',
    rating: 4.9,
    reviews: 89
  },
  {
    id: '3',
    name: 'Rose Petal Aromatherapy Candle',
    price: 28,
    category: 'Candles',
    image: '/rosePetalCandle.png',
    description: 'Calming rose-scented candle with real dried petals, perfect for relaxation.',
    rating: 4.7,
    reviews: 67
  },
  {
    id: '4',
    name: 'Cinnamon Spice Candle',
    price: 22,
    category: 'Candles',
    image: '/cinnamonCandle.jpeg',
    description: 'Warm cinnamon spice fragrance for cozy winter evenings.',
    rating: 4.6,
    reviews: 45
  },
  {
    id: '5',
    name: 'Handmade Birthday Card',
    price: 8,
    category: 'Cards',
    image: '/handmadeBd.jpg',
    description: 'Beautifully handcrafted birthday card with embossed details and gold foil.',
    rating: 4.9,
    reviews: 234
  },
  {
    id: '6',
    name: 'Thank You Card Set (6 pack)',
    price: 18,
    category: 'Cards',
    image: '/thankYouSet.webp',
    description: 'Elegant thank you cards with matching envelopes, perfect for any occasion.',
    rating: 4.8,
    reviews: 156
  },
  {
    id: '7',
    name: 'Anniversary Love Card',
    price: 10,
    category: 'Cards',
    image: '/anniversary.webp',
    description: 'Romantic anniversary card with heartfelt message and premium paper.',
    rating: 4.7,
    reviews: 98
  },
  {
    id: '8',
    name: 'Congratulations Card',
    price: 7,
    category: 'Cards',
    image: '/congrats.webp',
    description: 'Celebrate achievements with this vibrant congratulations card.',
    rating: 4.6,
    reviews: 76
  },
  {
    id: '9',
    name: 'Deluxe Gift Hamper',
    price: 85,
    category: 'Hampers',
    image: '/promo-hamper.png',
    description: 'Premium hamper with chocolates, wine, candles, and bath products.',
    rating: 4.9,
    reviews: 312
  },
  {
    id: '10',
    name: 'Spa Day Hamper',
    price: 65,
    category: 'Hampers',
    image: '/spahamper.jpg',
    description: 'Relaxation hamper with bath bombs, lotions, candles, and herbal tea.',
    rating: 4.8,
    reviews: 189
  },
  {
    id: '11',
    name: 'Chocolate Lover Hamper',
    price: 55,
    category: 'Hampers',
    image: '/chocolate.webp',
    description: 'Decadent chocolate selection with truffles, bars, and hot cocoa mix.',
    rating: 4.9,
    reviews: 267
  },
  {
    id: '12',
    name: 'Baby Shower Hamper',
    price: 75,
    category: 'Hampers',
    image: '/babyhamper.webp',
    description: 'Adorable baby hamper with soft toys, blankets, and baby care essentials.',
    rating: 4.7,
    reviews: 145
  }
];

export const testimonials = [
  {
    id: '1',
    name: 'Sarah M.',
    text: 'The candles smell absolutely divine! Fast delivery and beautiful packaging.',
    rating: 5
  },
  {
    id: '2',
    name: 'James K.',
    text: 'Birthday Buddy Bonus is genius! Got a free hamper after inviting my friends.',
    rating: 5
  },
  {
    id: '3',
    name: 'Emily R.',
    text: 'Perfect gift selection. The handmade cards are such high quality!',
    rating: 5
  }
];

export const faqs = [
  {
    question: 'How does the Birthday Buddy Bonus work?',
    answer: 'Invite friends to GiftAura! Each referral earns you 1 point. Collect 5 points to unlock a free Surprise Hamper or choose between a 10% discount or a free small gift.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and Apple Pay. All transactions are secure and encrypted.'
  },
  {
    question: 'How long does delivery take?',
    answer: 'Standard delivery takes 3-5 business days. Express delivery (1-2 days) is available for an additional fee.'
  },
  {
    question: 'Can I customize my gift hamper?',
    answer: 'Yes! Contact our customer service team and we can create a custom hamper tailored to your preferences.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer 30-day returns on unused items in original packaging. Candles must be unburned for safety reasons.'
  }
];
