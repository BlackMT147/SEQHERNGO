import type { User } from 'firebase/auth';

export type Program = {
  id: string;
  title: string;
  summary: string;
  description: string;
  imageId: string;
  sdgGoals: number[];
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string; // ISO string
  imageId: string;
};

export type UserProfile = {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: 'admin' | 'user';
};

// This combines Firebase's User object with our custom UserProfile
export type AppUser = User & UserProfile;
