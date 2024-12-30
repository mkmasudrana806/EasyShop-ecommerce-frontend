'use client'

import { TProduct } from '@/types/productType'
import React, { createContext, useContext, useState, useEffect } from 'react'
 

type RecentlyViewedContextType = {
  recentlyViewed: TProduct[]
  addToRecentlyViewed: (product: TProduct) => void
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined)

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext)
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider')
  }
  return context
}

export const RecentlyViewedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState<TProduct[]>([])

  useEffect(() => {
    const storedRecentlyViewed = localStorage.getItem('recentlyViewed')
    if (storedRecentlyViewed) {
      setRecentlyViewed(JSON.parse(storedRecentlyViewed))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed))
  }, [recentlyViewed])

  const addToRecentlyViewed = (product: TProduct) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item._id !== product._id)
      return [product, ...filtered].slice(0, 10) // Keep only the 10 most recent items
    })
  }

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addToRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  )
}

