# 🎒 BagItUp - AI-Powered Travel Planning Platform
# 🌍 BagItUp - Gen-Z Travel Platform



<div align="center">AI-powered packing recommendations and trip planning for the modern traveler.



![BagItUp](https://img.shields.io/badge/BagItUp-Travel%20Smarter-0066FF?style=for-the-badge)![Status](https://img.shields.io/badge/Status-90%25%20Complete-brightgreen)

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)![Frontend](https://img.shields.io/badge/Frontend-Next.js%2014-black)

![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)![Backend](https://img.shields.io/badge/Backend-Express%20%2B%20TypeScript-blue)

![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)![AI](https://img.shields.io/badge/AI-GPT--4o-purple)

![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

## ✨ Features

**Plan smarter, pack lighter, travel better** ✈️

- 🤖 **AI-Powered Recommendations** - GPT-4o analyzes your trip and suggests personalized packing lists

[Features](#-features) • [Quick Start](#-quick-start) • [Tech Stack](#-tech-stack) • [Documentation](#-documentation) • [Contributing](#-contributing)- 🗺️ **Smart Trip Planning** - Multi-step form for creating detailed travel plans

- 🛍️ **Curated Product Catalog** - Browse 20+ handpicked travel products with affiliate links

</div>- 🌓 **Dark Mode** - Beautiful light/dark themes with smooth transitions

- 📱 **Progressive Web App** - Install on your device, works offline

---- ⚡ **Lightning Fast** - Redis caching for instant AI responses

- 🎨 **Gen-Z Design** - Vibrant colors, glassmorphism, smooth animations

## 🌟 About

## 🎨 Design System

BagItUp is a modern, AI-powered travel planning platform designed for the Gen-Z traveler. It combines intelligent trip planning with personalized packing recommendations, helping you prepare for your adventures with ease.

### Colors

### ✨ Key Highlights- **Electric Blue** (#0066FF) - Primary brand color

- **Tangerine Orange** (#FF9100) - Accent/CTA color

- 🤖 **AI-Powered Recommendations** - Get personalized packing lists based on your destination, weather, and activities- **Mint Green** (#00FFC3) - Secondary accent

- 🗺️ **Smart Trip Planning** - Intuitive multi-step trip creation with real-time validation- **Lavender** (#8B5CF6) - Tertiary accent

- 🛍️ **Curated Product Marketplace** - Browse handpicked travel essentials with direct purchase links

- 🌓 **Dark Mode Support** - Beautiful themes for any lighting condition### Typography

- 📱 **Progressive Web App** - Install on any device, works offline- **Font:** Poppins (weights 300-800)

- ⚡ **Lightning Fast** - Redis caching for instant AI responses

- 🔒 **Secure Authentication** - Firebase-based user authentication## � Quick Start

- 💳 **Payment Integration** - Stripe-ready for future monetization

### Prerequisites

---- Node.js 18+ and npm

- MongoDB Atlas account

## 🚀 Features- OpenAI API key (optional)

- Upstash Redis account (optional)

### For Travelers

### Installation

- **Trip Dashboard**: Manage all your trips in one place

- **AI Packing Assistant**: Get customized packing lists powered by Groq AI```bash

- **Weather Integration**: Automatic weather-based recommendations# Install all dependencies

- **Activity Planning**: Organize your trip activities and itinerarynpm install

- **Product Discovery**: Browse curated travel gear and essentials

- **Offline Support**: Access your trips even without internet# Or install separately:

cd frontend && npm install

### For Developerscd ../backend && npm install

```

- **TypeScript**: Full type safety across frontend and backend

- **Modern Stack**: Next.js 14, Express, MongoDB, Redis### Environment Setup

- **Docker Ready**: Complete containerization setup

- **CI/CD Pipeline**: GitHub Actions workflow included**Backend** (`backend/.env`):

- **Scalable Architecture**: Microservices-ready design```properties

- **Comprehensive API**: RESTful endpoints with validationPORT=4000

NODE_ENV=development

---MONGO_URI=your_mongodb_connection_string

FIREBASE_SERVICE_ACCOUNT={...}

## 🏗️ Tech StackOPENAI_API_KEY=sk-...

UPSTASH_REDIS_REST_URL=https://...

### FrontendUPSTASH_REDIS_REST_TOKEN=...

- **Framework**: Next.js 14 (App Router)STRIPE_SECRET_KEY=sk_test_...

- **Language**: TypeScriptUSE_STRIPE=false

- **Styling**: Tailwind CSS```

- **Animation**: Framer Motion, AOS

- **State Management**: React Context API**Frontend** (`frontend/.env.local`):

- **Authentication**: Firebase Auth```properties

- **HTTP Client**: AxiosNEXT_PUBLIC_API_URL=http://localhost:4000

- **UI Components**: Radix UI, HeroiconsNEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

```

### Backend

- **Runtime**: Node.js### Start Development

- **Framework**: Express.js

- **Language**: TypeScript```bash

- **Database**: MongoDB (Mongoose ODM)# Run both servers concurrently

- **Authentication**: Firebase Admin SDKnpm run dev

- **AI Integration**: Groq SDK, Google Gemini AI

- **Caching**: Upstash Redis# Or run separately:

- **Payment**: Stripecd backend && npm run dev  # Port 4000

- **Security**: Helmet, CORScd frontend && npm run dev # Port 3001

```

### DevOps

- **Containerization**: Docker & Docker Compose### Seed Database

- **CI/CD**: GitHub Actions

- **Deployment**: Vercel-ready```bash

- **Version Control**: Gitcd backend

npx ts-node scripts/seedProducts.ts

---```



## 📦 Quick Start## 📱 Usage



### Prerequisites1. **Create Trip:** Navigate to My Trips → Plan New Trip

2. **Get AI Recommendations:** Fill out trip details and generate packing list

Before you begin, ensure you have the following installed:3. **Browse Products:** Filter and search travel gear

- **Node.js** 18+ and npm4. **Toggle Dark Mode:** Click sun/moon icon in navbar

- **MongoDB** (Atlas account recommended)5. **Install PWA:** Click install prompt in browser

- **Git**

## 🏗️ Architecture

Optional for full functionality:

- Groq API key (for AI recommendations)### Frontend

- Upstash Redis account (for caching)- Next.js 14 (App Router)

- Firebase project (for authentication)- Tailwind CSS + Custom Gen-Z palette

- Stripe account (for payments)- Framer Motion + AOS animations

- Radix UI components

### Installation- next-pwa for PWA functionality



1. **Clone the repository**### Backend

   ```bash- Express + TypeScript

   git clone https://github.com/IqbalHere/BagitUp.git- MongoDB with Mongoose

   cd BagitUp- Firebase Admin SDK (JWT auth)

   ```- OpenAI GPT-4o integration

- Upstash Redis caching

2. **Install dependencies**- Stripe payment processing

   ```bash

   # Install root dependencies## �️ API Endpoints

   npm install

   ### Trips

   # Install frontend dependencies- `GET /api/trips` - List all user trips

   cd frontend- `GET /api/trips/:id` - Get trip details

   npm install- `POST /api/trips` - Create trip

   - `PUT /api/trips/:id` - Update trip

   # Install backend dependencies- `DELETE /api/trips/:id` - Delete trip

   cd ../backend

   npm install### Products

   cd ..- `GET /api/products` - List products (with filters)

   ```- `GET /api/products/:id` - Get product details



3. **Environment Configuration**### Recommendations

- `GET /api/recommendations/:tripId` - Get trip recommendations

   Create `.env` files in both frontend and backend directories:- `POST /api/recommendations/:tripId` - Generate new recommendations



   **Backend** (`backend/.env`):## � Project Status

   ```env

   PORT=4000### ✅ Complete (90%)

   NODE_ENV=development- Backend infrastructure (models, controllers, routes)

   MONGO_URI=your_mongodb_connection_string- Frontend infrastructure (styling, themes, animations)

   - Homepage with Gen-Z design

   # Firebase Admin (JSON string)- Trip planning (list, create, details)

   FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"..."}- Product browsing with filters

   - Dark mode system

   # AI Services (at least one required)- PWA configuration

   GROQ_API_KEY=your_groq_api_key- AI recommendation engine

   GEMINI_API_KEY=your_gemini_api_key- Sample product data

   

   # Redis (optional, for caching)### 🚧 Pending (10%)

   UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io- Lottie animations

   UPSTASH_REDIS_REST_TOKEN=your_redis_token- Stripe checkout (frontend)

   - API keys configuration

   # Stripe (optional)- MongoDB IP whitelisting

   STRIPE_SECRET_KEY=sk_test_...- End-to-end testing

   USE_STRIPE=false

   ```## 📚 Documentation



   **Frontend** (`frontend/.env.local`):- **Implementation Summary:** `IMPLEMENTATION_SUMMARY.md`

   ```env- **Product Requirements:** `PRD.txt`

   NEXT_PUBLIC_API_URL=http://localhost:4000- **API Docs:** http://localhost:4000/api

   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

   ## 🚢 Deployment

   # Firebase Config

   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key### Vercel (Frontend)

   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com```bash

   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-idcd frontend

   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.comvercel --prod

   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789```

   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef

   ```### Railway/Heroku (Backend)

```bash

4. **Seed the Database** (Optional)cd backend

   ```bashnpm run build

   cd backend# Deploy to platform

   npx ts-node scripts/seedProducts.ts```

   cd ..

   ```## 🤝 Contributing



5. **Start Development Servers**Future enhancements:

- User onboarding flow

   **Option 1: Run both servers concurrently**- Trip sharing

   ```bash- Social features

   npm run dev- Budget tracking

   ```- Weather integration

- Calendar sync

   **Option 2: Run separately**

   ```bash## � License

   # Terminal 1 - Backend

   cd backendPrivate project. All rights reserved.

   npm run dev

   ---

   # Terminal 2 - Frontend

   cd frontendBuilt with ❤️ for Gen-Z travelers. Pack smart, travel better! ✈️🌍

   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000

---

## 🐳 Docker Deployment

Run the entire stack with Docker:

```bash
# Build and start all services
npm run docker:up

# Stop all services
npm run docker:down
```

Services will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- MongoDB: localhost:27017

---

## 📁 Project Structure

```
BagitUp/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # Next.js 14 app directory
│   │   ├── api/            # API routes
│   │   ├── auth/           # Authentication pages
│   │   ├── dashboard/      # Dashboard pages
│   │   ├── trip/           # Trip detail page
│   │   └── loading-trip/   # Loading states
│   ├── components/         # React components
│   │   └── ui/            # Reusable UI components
│   ├── lib/               # Utilities and configurations
│   │   ├── api/           # API client and services
│   │   ├── context/       # React context providers
│   │   └── firebase/      # Firebase configuration
│   └── public/            # Static assets
│
├── backend/                 # Express backend application
│   ├── src/
│   │   ├── config/        # Database and Firebase setup
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   └── services/      # Business logic and AI services
│   └── scripts/           # Utility scripts
│
├── shared/                  # Shared TypeScript types
├── .github/                # GitHub Actions workflows
└── docker-compose.yml      # Docker configuration
```

---

## 🎨 Design System

### Color Palette

- **Primary**: Electric Blue `#0066FF`
- **Accent**: Tangerine Orange `#FF9100`
- **Secondary**: Mint Green `#00FFC3`
- **Tertiary**: Lavender `#8B5CF6`

### Typography

- **Font Family**: Poppins
- **Weights**: 300 (Light), 400 (Regular), 600 (Semibold), 700 (Bold), 800 (Extrabold)

### Design Principles

- **Glassmorphism**: Frosted glass effects for modern UI
- **Smooth Animations**: Framer Motion for delightful interactions
- **Responsive**: Mobile-first design approach
- **Accessible**: WCAG 2.1 AA compliant

---

## 🔌 API Documentation

### Base URL
```
http://localhost:4000/api
```

### Main Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

#### Trips
- `GET /api/trips` - Get user's trips
- `POST /api/trips` - Create new trip
- `GET /api/trips/:id` - Get trip details
- `PUT /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip

#### Recommendations
- `POST /api/recommendations/generate` - Generate AI packing list
- `GET /api/recommendations/:tripId` - Get trip recommendations

#### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `GET /api/products/category/:category` - Get products by category

#### Gear
- `POST /api/gear/recommendations` - Get gear recommendations
- `GET /api/gear/categories` - Get gear categories

---

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm run test

# Backend tests
cd backend
npm run test

# Linting
npm run lint
```

---

## 🚢 Deployment

### Vercel (Frontend)

1. Import your repository to Vercel
2. Configure environment variables
3. Deploy with default settings

### Railway/Render (Backend)

1. Connect your GitHub repository
2. Set environment variables
3. Configure build command: `cd backend && npm run build`
4. Set start command: `cd backend && npm start`

### MongoDB Atlas

1. Create a cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Whitelist your deployment IPs
3. Copy connection string to `MONGO_URI`

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Write clean, documented code
- Follow TypeScript best practices
- Add tests for new features
- Update documentation as needed
- Follow conventional commit messages

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Groq](https://groq.com/) - AI inference
- [Firebase](https://firebase.google.com/) - Authentication
- [Stripe](https://stripe.com/) - Payment processing
- [Upstash](https://upstash.com/) - Redis caching
- [Vercel](https://vercel.com/) - Hosting platform

---

## 📧 Contact

**Project Maintainer**: Iqbal

- GitHub: [@IqbalHere](https://github.com/IqbalHere)
- Repository: [BagItUp](https://github.com/IqbalHere/BagitUp)

---

## 🗺️ Roadmap

- [ ] Social features (trip sharing, following travelers)
- [ ] Collaborative trip planning
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Integration with booking platforms
- [ ] Community marketplace for travel tips

---

<div align="center">

**Made with ❤️ for travelers around the world**

⭐ Star this repo if you find it helpful!

</div>
