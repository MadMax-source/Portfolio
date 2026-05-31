'use client';

import { createContext, useContext, useState } from 'react';

export interface Review {
  _id?: string;
  projectId: string;
  name: string;
  position: string;
  review: string;
  rating: number;
  imageUrl?: string;
}

interface ReviewContextType {
  reviews: Review[];
  loading: boolean;
  fetchReviews: (projectId?: string) => Promise<void>;
  addReview: (data: Partial<Review> & { image?: string }) => Promise<void>;
}

const ReviewContext = createContext<ReviewContextType | null>(null);

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async (projectId?: string) => {
    setLoading(true);

    const url = projectId ? `/api/reviews?projectId=${projectId}` : '/api/reviews';

    const res = await fetch(url);

    const data = await res.json();

    setReviews(data);

    setLoading(false);
  };

  const addReview = async (data: any) => {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const newReview = await res.json();

    setReviews((prev) => [newReview, ...prev]);
  };

  return (
    <ReviewContext.Provider value={{ reviews, loading, fetchReviews, addReview }}>
      {children}
    </ReviewContext.Provider>
  );
}

export const useReviews = () => {
  const ctx = useContext(ReviewContext);
  if (!ctx) throw new Error('useReviews must be used inside provider');
  return ctx;
};
