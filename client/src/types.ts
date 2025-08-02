export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Should not be sent from backend, but included for fake API
  token?: string; // JWT token
}

export interface DesignImage {
  url: string;
  altText: string;
}

export interface Design {
  _id: string;
  title: string;
  description: string;
  images: DesignImage[];
  category: string;
  rating: number;
  tags: string[];
}

export interface Feedback {
  id: number;
  user: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
  designId: string;
}
