import { ImageSourcePropType } from 'react-native';

export interface AlternativeStoreOffer {
  storeName: string;
  distance: string;
  price: number;
  currency: string;
}

export interface BestStoreOffer {
  storeName: string;
  distance: string;
  flyerDates: string;
  isLowest: boolean;
}

export interface AiProductComparison {
  id: string;
  name: string;
  packageSize: string;
  lowestPrice: number;
  currency: string;
  packshotImage: ImageSourcePropType;
  bestOffer: BestStoreOffer;
  alternatives: AlternativeStoreOffer[];
  flyerId: string;
}

export interface BasketSummary {
  itemCount: number;
  storesCount: number;
  totalPrice: number;
  currency: string;
  items: {
    name: string;
    storeName: string;
    price: number;
  }[];
}

export interface AiSearchResultResponse {
  query: string;
  detectedTags: string[];
  assistantTitle: string;
  assistantSummary: string;
  disclaimer: string;
  products: AiProductComparison[];
  basket: BasketSummary;
  suggestedQuestions: string[];
}

export const DEFAULT_AI_SEARCH_RESULT: AiSearchResultResponse = {
  query: 'Pepsi, Coke, milk, bread and eggs',
  detectedTags: ['Pepsi', 'Coke', 'Milk', 'Bread', 'Eggs'],
  assistantTitle: 'Five finds, brought together.',
  assistantSummary:
    "I've compared current flyers across Markham stores. Here are the best matches for each item on your list, along with alternative stores nearby.",
  disclaimer: 'Demo query: live prices are samples from weekly flyers.',
  products: [
    {
      id: 'pepsi',
      name: 'Pepsi 12 × 355 mL',
      packageSize: '12-can pack',
      lowestPrice: 5.99,
      currency: 'CAD',
      packshotImage: require('../../assets/images/ai/pepsi_pack.png'),
      bestOffer: {
        storeName: 'No Frills',
        distance: '1.2 km',
        flyerDates: 'OCT 24 – OCT 30',
        isLowest: true,
      },
      alternatives: [
        { storeName: 'FreshCo', distance: '2.1 km', price: 6.49, currency: 'CAD' },
        { storeName: 'Walmart', distance: '2.4 km', price: 6.97, currency: 'CAD' },
      ],
      flyerId: 'no_frills',
    },
    {
      id: 'coke',
      name: 'Coca-Cola Original 12 × 355 mL',
      packageSize: '12-can pack',
      lowestPrice: 6.49,
      currency: 'CAD',
      packshotImage: require('../../assets/images/ai/coke_pack.png'),
      bestOffer: {
        storeName: 'FreshCo',
        distance: '2.1 km',
        flyerDates: 'OCT 24 – OCT 30',
        isLowest: true,
      },
      alternatives: [
        { storeName: 'No Frills', distance: '1.2 km', price: 6.99, currency: 'CAD' },
        { storeName: 'Walmart', distance: '2.4 km', price: 6.97, currency: 'CAD' },
      ],
      flyerId: 'freshco',
    },
    {
      id: 'milk',
      name: 'Sealtest 2% Partly Skimmed Milk',
      packageSize: '4 L bag',
      lowestPrice: 5.89,
      currency: 'CAD',
      packshotImage: require('../../assets/images/ai/milk_pack.png'),
      bestOffer: {
        storeName: 'No Frills',
        distance: '1.2 km',
        flyerDates: 'OCT 24 – OCT 30',
        isLowest: true,
      },
      alternatives: [
        { storeName: "Longo's", distance: '1.8 km', price: 6.29, currency: 'CAD' },
        { storeName: 'Shoppers', distance: '0.8 km', price: 6.49, currency: 'CAD' },
      ],
      flyerId: 'no_frills',
    },
    {
      id: 'bread',
      name: 'Wonder White Sliced Bread',
      packageSize: '675 g',
      lowestPrice: 2.79,
      currency: 'CAD',
      packshotImage: require('../../assets/images/ai/bread_pack.png'),
      bestOffer: {
        storeName: 'Walmart',
        distance: '2.4 km',
        flyerDates: 'OCT 24 – OCT 30',
        isLowest: true,
      },
      alternatives: [
        { storeName: 'FreshCo', distance: '2.1 km', price: 2.99, currency: 'CAD' },
        { storeName: 'No Frills', distance: '1.2 km', price: 3.19, currency: 'CAD' },
      ],
      flyerId: 'walmart',
    },
    {
      id: 'eggs',
      name: 'Burnbrae Farms Large White Eggs',
      packageSize: '12-pack (1 dozen)',
      lowestPrice: 3.29,
      currency: 'CAD',
      packshotImage: require('../../assets/images/ai/eggs_pack.png'),
      bestOffer: {
        storeName: 'No Frills',
        distance: '1.2 km',
        flyerDates: 'OCT 24 – OCT 30',
        isLowest: true,
      },
      alternatives: [
        { storeName: 'FreshCo', distance: '2.1 km', price: 3.69, currency: 'CAD' },
        { storeName: 'Shoppers', distance: '0.8 km', price: 3.99, currency: 'CAD' },
      ],
      flyerId: 'no_frills',
    },
  ],
  basket: {
    itemCount: 5,
    storesCount: 3,
    totalPrice: 24.45,
    currency: 'CAD',
    items: [
      { name: 'Pepsi 12 × 355 mL', storeName: 'No Frills', price: 5.99 },
      { name: 'Coca-Cola 12 × 355 mL', storeName: 'FreshCo', price: 6.49 },
      { name: 'Sealtest 2% Milk 4 L', storeName: 'No Frills', price: 5.89 },
      { name: 'Wonder White Bread 675 g', storeName: 'Walmart', price: 2.79 },
      { name: 'Burnbrae Eggs Large 12pk', storeName: 'No Frills', price: 3.29 },
    ],
  },
  suggestedQuestions: [
    'Can I get everything at one store?',
    'What if I shop only at No Frills?',
    'Are there any coupons available?',
  ],
};
