import mongoose from 'mongoose'
import Product from '../src/models/Product'
import dotenv from 'dotenv'

dotenv.config()

const sampleProducts = [
  // Luggage
  {
    name: 'Samsonite Omni PC Hardside Spinner',
    description: 'Durable polycarbonate hard-shell luggage with 360° spinner wheels. TSA lock included.',
    category: 'luggage',
    price: 149.99,
    currency: '$',
    affiliateUrl: 'https://amazon.com/samsonite-omni',
    affiliatePartner: 'Amazon',
    imageUrl: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400',
    tags: ['hardside', 'spinner', 'durable', 'TSA'],
    rating: 4.7,
    reviewCount: 2341,
    inStock: true,
    featured: true,
  },
  {
    name: 'Away Carry-On',
    description: 'Premium lightweight polycarbonate carry-on with built-in USB charger and TSA-approved lock.',
    category: 'luggage',
    price: 225.00,
    currency: '$',
    affiliateUrl: 'https://awaytravel.com/carry-on',
    affiliatePartner: 'Away',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    tags: ['carry-on', 'USB', 'premium', 'lightweight'],
    rating: 4.8,
    reviewCount: 5612,
    inStock: true,
    featured: true,
  },

  // Backpacks
  {
    name: 'Osprey Farpoint 40 Travel Backpack',
    description: 'Versatile travel backpack with laptop compartment, perfect for carry-on adventures.',
    category: 'luggage',
    price: 159.95,
    currency: '$',
    affiliateUrl: 'https://amazon.com/osprey-farpoint',
    affiliatePartner: 'Amazon',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    tags: ['travel', 'laptop', 'carry-on', 'durable'],
    rating: 4.9,
    reviewCount: 3421,
    inStock: true,
    featured: true,
  },
  {
    name: 'Patagonia Black Hole 32L Duffel',
    description: 'Weather-resistant duffel bag made from recycled materials. Converts to backpack.',
    category: 'luggage',
    price: 119.00,
    currency: '$',
    affiliateUrl: 'https://patagonia.com/blackhole',
    affiliatePartner: 'Patagonia',
    imageUrl: 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=400',
    tags: ['duffel', 'sustainable', 'weather-resistant', 'convertible'],
    rating: 4.7,
    reviewCount: 1876,
    inStock: true,
    featured: false,
  },

  // Electronics
  {
    name: 'Anker PowerCore 20000mAh Power Bank',
    description: 'High-capacity portable charger with dual USB ports. Charges phones 4-5 times.',
    category: 'electronics',
    price: 45.99,
    currency: '$',
    affiliateUrl: 'https://amazon.com/anker-powercore',
    affiliatePartner: 'Amazon',
    imageUrl: 'https://images.unsplash.com/photo-1609592282998-53e2e2ed518c?w=400',
    tags: ['power-bank', 'USB', 'portable', 'fast-charge'],
    rating: 4.6,
    reviewCount: 8234,
    inStock: true,
    featured: true,
  },
  {
    name: 'Bose QuietComfort 45 Headphones',
    description: 'Noise-cancelling wireless headphones with 24-hour battery life. Perfect for flights.',
    category: 'electronics',
    price: 329.00,
    currency: '$',
    affiliateUrl: 'https://amazon.com/bose-qc45',
    affiliatePartner: 'Amazon',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    tags: ['noise-cancelling', 'wireless', 'long-battery', 'premium'],
    rating: 4.8,
    reviewCount: 4521,
    inStock: true,
    featured: true,
  },
  {
    name: 'Universal Travel Adapter',
    description: 'All-in-one travel adapter with 4 USB ports. Works in 150+ countries.',
    category: 'electronics',
    price: 29.99,
    currency: '$',
    affiliateUrl: 'https://amazon.com/travel-adapter',
    affiliatePartner: 'Amazon',
    imageUrl: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400',
    tags: ['adapter', 'USB', 'universal', 'compact'],
    rating: 4.5,
    reviewCount: 2134,
    inStock: true,
    featured: false,
  },

  // Clothing
  {
    name: 'Unbound Merino Travel Shirt',
    description: 'Odor-resistant merino wool t-shirt. Wear for days without washing.',
    category: 'clothing',
    price: 68.00,
    currency: '$',
    affiliateUrl: 'https://unboundmerino.com/shirt',
    affiliatePartner: 'Unbound Merino',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    tags: ['merino', 'odor-resistant', 'quick-dry', 'minimalist'],
    rating: 4.7,
    reviewCount: 892,
    inStock: true,
    featured: false,
  },
  {
    name: 'Columbia Packable Rain Jacket',
    description: 'Lightweight waterproof jacket that packs into its own pocket.',
    category: 'clothing',
    price: 54.99,
    currency: '$',
    affiliateUrl: 'https://amazon.com/columbia-rain',
    affiliatePartner: 'Amazon',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    tags: ['rain-jacket', 'packable', 'waterproof', 'lightweight'],
    rating: 4.6,
    reviewCount: 3421,
    inStock: true,
    featured: false,
  },

  // Footwear
  {
    name: 'Allbirds Tree Runners',
    description: 'Sustainable sneakers made from eucalyptus fiber. Machine washable.',
    category: 'clothing',
    price: 98.00,
    currency: '$',
    affiliateUrl: 'https://allbirds.com/tree-runners',
    affiliatePartner: 'Allbirds',
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
    tags: ['sneakers', 'sustainable', 'comfortable', 'washable'],
    rating: 4.8,
    reviewCount: 5621,
    inStock: true,
    featured: true,
  },
  {
    name: 'Teva Sandals Universal',
    description: 'Quick-dry adventure sandals with adjustable straps. Perfect for beach trips.',
    category: 'clothing',
    price: 49.95,
    currency: '$',
    affiliateUrl: 'https://amazon.com/teva-universal',
    affiliatePartner: 'Amazon',
    imageUrl: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400',
    tags: ['sandals', 'quick-dry', 'adjustable', 'beach'],
    rating: 4.5,
    reviewCount: 2134,
    inStock: true,
    featured: false,
  },

  // Accessories
  {
    name: 'Trtl Pillow Plus',
    description: 'Scientifically proven neck support pillow. Wraps around neck like a scarf.',
    category: 'accessories',
    price: 59.99,
    currency: '$',
    affiliateUrl: 'https://amazon.com/trtl-pillow',
    affiliatePartner: 'Amazon',
    imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400',
    tags: ['neck-pillow', 'ergonomic', 'travel', 'comfort'],
    rating: 4.4,
    reviewCount: 4521,
    inStock: true,
    featured: false,
  },
  {
    name: 'Eagle Creek Packing Cubes Set',
    description: 'Ultra-light packing cubes for organized travel. Set of 3 in different sizes.',
    category: 'accessories',
    price: 34.95,
    currency: '$',
    affiliateUrl: 'https://amazon.com/eagle-creek-cubes',
    affiliatePartner: 'Amazon',
    imageUrl: 'https://images.unsplash.com/photo-1618914361413-3473c81e36fa?w=400',
    tags: ['packing-cubes', 'organization', 'lightweight', 'set'],
    rating: 4.7,
    reviewCount: 6234,
    inStock: true,
    featured: true,
  },

  // Travel Gear
  {
    name: 'LifeStraw Personal Water Filter',
    description: 'Portable water filter removes 99.9% of bacteria. Essential for adventure travel.',
    category: 'outdoor-gear',
    price: 19.95,
    currency: '$',
    affiliateUrl: 'https://amazon.com/lifestraw',
    affiliatePartner: 'Amazon',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400',
    tags: ['water-filter', 'portable', 'emergency', 'outdoor'],
    rating: 4.8,
    reviewCount: 12453,
    inStock: true,
    featured: true,
  },
  {
    name: 'Scrubba Wash Bag',
    description: 'Portable washing machine in a bag. Clean clothes anywhere in 3 minutes.',
    category: 'outdoor-gear',
    price: 54.95,
    currency: '$',
    affiliateUrl: 'https://amazon.com/scrubba',
    affiliatePartner: 'Amazon',
    imageUrl: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400',
    tags: ['laundry', 'portable', 'compact', 'travel'],
    rating: 4.6,
    reviewCount: 1876,
    inStock: true,
    featured: false,
  },

  // Health & Safety
  {
    name: 'First Aid Kit - Compact',
    description: '120-piece first aid kit in compact case. TSA approved.',
    category: 'health-safety',
    price: 24.99,
    currency: '$',
    affiliateUrl: 'https://amazon.com/first-aid-kit',
    affiliatePartner: 'Amazon',
    imageUrl: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400',
    tags: ['first-aid', 'emergency', 'TSA', 'compact'],
    rating: 4.5,
    reviewCount: 3421,
    inStock: true,
    featured: false,
  },
  {
    name: 'Hand Sanitizer Travel Size',
    description: 'TSA-approved 3oz bottles. Pack of 6 with clip-on holders.',
    category: 'health-safety',
    price: 15.99,
    currency: '$',
    affiliateUrl: 'https://amazon.com/hand-sanitizer',
    affiliatePartner: 'Amazon',
    imageUrl: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400',
    tags: ['sanitizer', 'TSA', 'clip-on', 'pack'],
    rating: 4.3,
    reviewCount: 892,
    inStock: true,
    featured: false,
  },

  // Documents
  {
    name: 'RFID Blocking Passport Holder',
    description: 'Protects against identity theft with RFID blocking technology. Holds 4 passports.',
    category: 'travel-docs',
    price: 16.99,
    currency: '$',
    affiliateUrl: 'https://amazon.com/rfid-passport',
    affiliatePartner: 'Amazon',
    imageUrl: 'https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?w=400',
    tags: ['RFID', 'passport', 'security', 'organizer'],
    rating: 4.6,
    reviewCount: 4521,
    inStock: true,
    featured: false,
  },

  // Entertainment
  {
    name: 'Kindle Paperwhite',
    description: 'Waterproof e-reader with glare-free display. Store thousands of books.',
    category: 'electronics',
    price: 139.99,
    currency: '$',
    affiliateUrl: 'https://amazon.com/kindle-paperwhite',
    affiliatePartner: 'Amazon',
    imageUrl: 'https://images.unsplash.com/photo-1592807633787-be7b20c3155a?w=400',
    tags: ['e-reader', 'waterproof', 'books', 'lightweight'],
    rating: 4.7,
    reviewCount: 15234,
    inStock: true,
    featured: true,
  },
]

async function seedProducts() {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGO_URI || '')

    console.log('Clearing existing products...')
    await Product.deleteMany({})

    console.log('Inserting sample products...')
    const result = await Product.insertMany(sampleProducts)

    console.log(`✅ Successfully seeded ${result.length} products!`)
    console.log('\nProduct Categories:')
    const categoryCounts: { [key: string]: number } = {}
    result.forEach(product => {
      categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1
    })
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`  - ${category}: ${count} products`)
    })

    await mongoose.connection.close()
    console.log('\n✨ Database connection closed')
  } catch (error) {
    console.error('❌ Error seeding products:', error)
    process.exit(1)
  }
}

seedProducts()
