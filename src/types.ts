export interface PortfolioProject {
  id: string;
  number: string;
  name: string;
  category: string;
  previewImage: string;
  websiteUrl: string;
  year?: string;
  aspect?: 'wide' | 'standard';
}

export interface ContactProfile {
  title: string;
  name: string;
  phoneNumber: string;
  whatsappNumber: string;
}

export interface LocationConfig {
  title: string;
  address: string;
  landmark?: string;
  city: string;
  country: string;
  coordinates: string;
  embedUrl: string;
  directionsUrl?: string;
  customImageUrl?: string;
}
