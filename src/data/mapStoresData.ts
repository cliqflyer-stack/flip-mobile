import { ImageSourcePropType } from 'react-native';

export interface MapStore {
  id: string;
  name: string;
  initial: string;
  logoBg: string;
  logoColor?: string;
  distance: string;
  dealsCount: string;
  category: string;
  latitude: number;
  longitude: number;
  xPercent: number; // percentage X on map canvas for fallback
  yPercent: number; // percentage Y on map canvas for fallback
  address: string;
  hours: string;
  phone: string;
  flyer: {
    title: string;
    validDates: string;
    dealCount: number;
    thumbnail: ImageSourcePropType;
  };
}

export const USER_LOCATION = {
  latitude: 43.8561,
  longitude: -79.3370,
  label: 'You',
  city: 'Markham, ON',
};

export const MAP_STORES: MapStore[] = [
  {
    id: 'my_drug_mart',
    name: 'MY DRUG MART',
    initial: 'MD',
    logoBg: '#075E50',
    logoColor: '#D8F36A',
    distance: '1.2 km',
    dealsCount: '24 deals',
    category: 'Groceries',
    latitude: 43.8427,
    longitude: -79.3563,
    xPercent: 50,
    yPercent: 44,
    address: '8400 Woodbine Ave, Markham, ON L3R 4N7',
    hours: 'Open today: 8:00 AM – 10:00 PM',
    phone: '(905) 475-1234',
    flyer: {
      title: 'Weekly Savings & Wellness',
      validDates: 'OCT 24 – OCT 30',
      dealCount: 24,
      thumbnail: require('../../assets/images/explore/drug_mart_flyer.png'),
    },
  },
  {
    id: 'shoppers',
    name: 'Shoppers',
    initial: 'SDM',
    logoBg: '#D32F2F',
    logoColor: '#FFFFFF',
    distance: '0.8 km',
    dealsCount: '18 deals',
    category: 'Groceries',
    latitude: 43.8687,
    longitude: -79.2942,
    xPercent: 36,
    yPercent: 32,
    address: '4981 Hwy 7, Markham, ON L3R 1N1',
    hours: 'Open today: 8:00 AM – Midnight',
    phone: '(905) 477-8000',
    flyer: {
      title: 'Super Savings Flyer',
      validDates: 'OCT 24 – OCT 30',
      dealCount: 18,
      thumbnail: require('../../assets/images/explore/sample_flyer.jpg'),
    },
  },
  {
    id: 'longos',
    name: "Longo's",
    initial: 'L',
    logoBg: '#1B5E20',
    logoColor: '#FFFFFF',
    distance: '1.8 km',
    dealsCount: '31 deals',
    category: 'Groceries',
    latitude: 43.8525,
    longitude: -79.3528,
    xPercent: 68,
    yPercent: 28,
    address: '3085 Hwy 7, Markham, ON L3R 0J5',
    hours: 'Open today: 7:00 AM – 9:00 PM',
    phone: '(905) 940-8800',
    flyer: {
      title: 'Fresh Market Picks',
      validDates: 'OCT 24 – OCT 30',
      dealCount: 31,
      thumbnail: require('../../assets/images/explore/longos_flyer.png'),
    },
  },
  {
    id: 'home_hardware',
    name: 'Home Hardware',
    initial: 'HH',
    logoBg: '#D32F2F',
    logoColor: '#FFEB3B',
    distance: '2.1 km',
    dealsCount: '15 deals',
    category: 'Hardware',
    latitude: 43.8763,
    longitude: -79.2562,
    xPercent: 26,
    yPercent: 58,
    address: '5694 Hwy 7, Markham, ON L3P 1B4',
    hours: 'Open today: 8:00 AM – 7:00 PM',
    phone: '(905) 294-2443',
    flyer: {
      title: 'Fall Home & Hardware Essentials',
      validDates: 'OCT 20 – NOV 02',
      dealCount: 15,
      thumbnail: require('../../assets/images/explore/hardware_flyer.png'),
    },
  },
  {
    id: 'walmart',
    name: 'Walmart',
    initial: 'W',
    logoBg: '#0071DC',
    logoColor: '#FFFFFF',
    distance: '2.4 km',
    dealsCount: '52 deals',
    category: 'Groceries',
    latitude: 43.8732,
    longitude: -79.2274,
    xPercent: 76,
    yPercent: 62,
    address: '500 Copper Creek Dr, Markham, ON L6B 0S1',
    hours: 'Open today: 7:00 AM – 11:00 PM',
    phone: '(905) 201-9258',
    flyer: {
      title: 'Rollback & Super Deals',
      validDates: 'OCT 24 – OCT 30',
      dealCount: 52,
      thumbnail: require('../../assets/images/explore/sample_flyer.jpg'),
    },
  },
  {
    id: 'no_frills',
    name: 'No Frills',
    initial: 'NF',
    logoBg: '#FBC02D',
    logoColor: '#1B1B1B',
    distance: '3.6 km',
    dealsCount: '40 deals',
    category: 'Groceries',
    latitude: 43.8767,
    longitude: -79.2541,
    xPercent: 44,
    yPercent: 74,
    address: '5762 Hwy 7, Markham, ON L3P 1A7',
    hours: 'Open today: 8:00 AM – 9:00 PM',
    phone: '(905) 294-0100',
    flyer: {
      title: "Won't Be Beat Flyer",
      validDates: 'OCT 24 – OCT 30',
      dealCount: 40,
      thumbnail: require('../../assets/images/explore/sample_flyer.jpg'),
    },
  },
];
