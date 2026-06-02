'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface Social {
  platform: string;
  label: string;
  url: string;
}

interface SocialContextType {
  socials: Social[];
  setSocials: React.Dispatch<React.SetStateAction<Social[]>>;
  fetchSocials: () => Promise<void>;
  saveSocials: () => Promise<void>;
}

const SocialContext = createContext<SocialContextType | null>(null);

export function SocialProvider({ children }: { children: React.ReactNode }) {
  const [socials, setSocials] = useState<Social[]>([]);

  const fetchSocials = async () => {
    try {
      const res = await fetch('/api/socials');

      const data = await res.json();

      setSocials(data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveSocials = async () => {
    try {
      await fetch('/api/socials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(socials),
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSocials();
  }, []);

  return (
    <SocialContext.Provider
      value={{
        socials,
        setSocials,
        fetchSocials,
        saveSocials,
      }}
    >
      {children}
    </SocialContext.Provider>
  );
}

export function useSocials() {
  const context = useContext(SocialContext);

  if (!context) {
    throw new Error('useSocials must be used within SocialProvider');
  }

  return context;
}
