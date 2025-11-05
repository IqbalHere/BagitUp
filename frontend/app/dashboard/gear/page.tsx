'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTrip } from '@/lib/context/TripContext'
import Image from 'next/image'

interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  currency: string
  rating: number
  reviews: number
  image: string
  affiliateUrl: string
  features: string[]
}

export default function GearPage() {
  const { trip } = useTrip()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  useEffect(() => {
    if (!trip) return

    const fetchProducts = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `/api/products?destination=${encodeURIComponent(trip.destination)}`
        )
        const data = await response.json()
        setProducts(data.products || [])
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [trip])

  if (!trip) {
    return null
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="text-4xl mb-4">🎒</div>
          <p className="text-tealgreen text-lg">Loading gear recommendations...</p>
        </div>
      </div>
    )
  }

  // Get unique categories
  const categories = ['All', ...new Set(products.map((p) => p.category))]
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory)

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 md:p-8 border border-gray-100"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-tealgreen">
          Travel Gear & Essentials
        </h1>
        <p className="text-gray-600">
          Recommended products for your trip to {trip.destination}
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === category
                ? 'bg-tealgreen text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-tealgreen'
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group"
          >
            {/* Product Image */}
            <div className="relative h-48 md:h-56 bg-gray-100 overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-semibold text-gray-700">
                {product.category}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.description}
              </p>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {product.features.slice(0, 3).map((feature, i) => (
                      <span
                        key={i}
                        className="text-xs bg-cream text-tealgreen px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3 text-sm">
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1 font-semibold text-gray-900">
                    {product.rating}
                  </span>
                </div>
                <span className="text-gray-500">({product.reviews} reviews)</span>
              </div>

              {/* Price and CTA */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-tealgreen">
                    ${product.price}
                  </span>
                </div>
                <a
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-tealgreen text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-semibold"
                >
                  Buy Now
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-5xl mb-4">📦</div>
          <p className="text-gray-600">No products found in this category</p>
        </motion.div>
      )}

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-lightblue bg-opacity-20 rounded-xl p-6 border border-lightblue"
      >
        <h3 className="text-lg font-bold mb-2 text-tealgreen">
          💡 Smart Packing Tips
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-coolseablue mt-0.5">→</span>
            <span>Pack versatile clothing that can be mixed and matched</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-coolseablue mt-0.5">→</span>
            <span>Use packing cubes to organize and compress your items</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-coolseablue mt-0.5">→</span>
            <span>Always keep essentials in your carry-on bag</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-coolseablue mt-0.5">→</span>
            <span>Check airline baggage restrictions before packing</span>
          </li>
        </ul>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center text-gray-500 text-xs py-4"
      >
        <p>
          Note: Product links are affiliate links. We may earn a commission at no extra cost to you.
        </p>
      </motion.div>
    </div>
  )
}
