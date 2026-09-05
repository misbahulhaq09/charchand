import { PortfolioProject, ContactProfile, LocationConfig } from '../types';

export const INITIAL_PROJECTS: PortfolioProject[] = [
  {
    id: 'project-01',
    number: '01',
    name: 'CHAR CHAND HAUTE COUTURE',
    category: 'Luxury Indian Fashion & Couture Atelier',
    previewImage: '/char-chand.png',
    websiteUrl: 'https://charchand.netlify.app/',
    year: '2026',
    aspect: 'wide'
  },
  {
    id: 'project-02',
    number: '02',
    name: 'DEEVA LUXURY JEWELLERY',
    category: 'Lab Grown Luxury Fine Jewelry',
    previewImage: '/deeva-luxury-jewellery.png',
    websiteUrl: 'https://deevaluxuryjewellery.netlify.app/',
    year: '2026',
    aspect: 'wide'
  },
  {
    id: 'project-03',
    number: '03',
    name: 'KINETIC CREATIVE LAB',
    category: 'Interactive Production & Digital Experience',
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80',
    websiteUrl: '',
    year: '2025',
    aspect: 'wide'
  },
  {
    id: 'project-04',
    number: '04',
    name: 'SIMNANI GROUP',
    category: 'Real Estate & Infrastructure Development',
    previewImage: '/simnani-group.png',
    websiteUrl: 'https://simnanigroup.co.in/',
    year: '2025',
    aspect: 'wide'
  },
  {
    id: 'project-05',
    number: '05',
    name: 'VERVE EDITORIAL PUBLISHING',
    category: 'Contemporary Art & Design Journal',
    previewImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1600&q=80',
    websiteUrl: '',
    year: '2025',
    aspect: 'wide'
  }
];

export const INITIAL_MY_CONTACT: ContactProfile = {
  title: 'MIS BAHUL HAQ',
  name: 'Misbahul Haq',
  phoneNumber: '+91 92029 88135',
  whatsappNumber: '+919202988135'
};

export const INITIAL_DIMPLE_CONTACT: ContactProfile = {
  title: 'DIMPLE',
  name: 'Dimple',
  phoneNumber: '+91 70675 23418',
  whatsappNumber: '+917067523418'
};

export const INITIAL_LOCATION: LocationConfig = {
  title: 'STUDIO LOCATION',
  address: 'Office No. 1080, Currency Tower',
  landmark: 'VIP Road',
  city: 'Raipur, Chhattisgarh',
  country: 'INDIA',
  coordinates: '21.2334° N, 81.6702° E',
  embedUrl: 'https://maps.google.com/maps?q=Currency+Tower+VIP+Road+Raipur&t=&z=15&ie=UTF8&iwloc=&output=embed',
  directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Currency+Tower+VIP+Road+Raipur+1080',
  customImageUrl: ''
};
