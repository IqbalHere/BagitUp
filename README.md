<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:6C63FF,50:A855F7,100:EC4899&height=220&section=header&text=BagItUp&fontSize=50&fontColor=FFFFFF&fontAlignY=35&desc=AI-Powered%20Travel%20Planning%20Platform&descSize=20&descAlignY=55&animation=fadeIn" width="100%" />

  <br />

  <div align="center">
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
    <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
    <img src="https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
    <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License" />
    <img src="https://img.shields.io/badge/Node-%3E%3D18.0.0-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js Version" />
  </div>

  <br />

  <p align="center">
    <strong>Plan smarter, pack lighter, and travel better with our Gen-Z AI-powered travel companion.</strong>
  </p>

  <br />

  <h3>🚀 <a href="#-quick-start">Quick Start</a> • 📖 <a href="#-api-reference">Docs</a> • 🔧 <a href="#-configuration">Config</a> • 🤝 <a href="#-contributing">Contributing</a></h3>
</div>

<br />

## ✨ Features

<table>
  <tbody>
    <tr>
      <td width="5%" align="center">🤖</td>
      <td><strong>AI-Powered Recommendations</strong><br/>GPT-4o analyzes your trip and suggests highly personalized packing lists and travel recommendations.</td>
    </tr>
    <tr>
      <td width="5%" align="center">🗺️</td>
      <td><strong>Smart Trip Planning</strong><br/>Multi-step intuitive form for creating detailed travel plans, organizing itineraries, and managing trips.</td>
    </tr>
    <tr>
      <td width="5%" align="center">🛍️</td>
      <td><strong>Curated Product Catalog</strong><br/>Browse 20+ handpicked travel products with direct affiliate links to essential gear.</td>
    </tr>
    <tr>
      <td width="5%" align="center">📱</td>
      <td><strong>Progressive Web App</strong><br/>Install BagItUp directly on your device with offline support for accessing plans anywhere.</td>
    </tr>
    <tr>
      <td width="5%" align="center">⚡</td>
      <td><strong>Lightning Fast</strong><br/>Powered by Upstash Redis caching for instant AI responses and highly optimized load times.</td>
    </tr>
  </tbody>
</table>

## 🏗️ Architecture

```mermaid
graph LR
    User([👤 User]) -->|HTTP/REST| FE[💻 Next.js Frontend]
    FE -->|API Calls| BE[⚙️ Express Backend]
    BE -->|Read/Write| DB[(🍃 MongoDB)]
    BE -->|Auth Verification| FB[🔐 Firebase Auth]
    BE -->|AI Generation| AI[🧠 OpenAI/Groq]
    BE -->|Cache| Redis[(⚡ Upstash Redis)]

    style User fill:#A855F7,stroke:#333,stroke-width:2px,color:#fff
    style FE fill:#6C63FF,stroke:#333,stroke-width:2px,color:#fff
    style BE fill:#10B981,stroke:#333,stroke-width:2px,color:#fff
    style DB fill:#F59E0B,stroke:#333,stroke-width:2px,color:#fff
    style FB fill:#EF4444,stroke:#333,stroke-width:2px,color:#fff
    style AI fill:#6C63FF,stroke:#333,stroke-width:2px,color:#fff
    style Redis fill:#EF4444,stroke:#333,stroke-width:2px,color:#fff
```

## 📦 Prerequisites

Ensure you have the following installed before proceeding:

| Requirement | Badge |
| :--- | :--- |
| **Node.js** | <img src="https://img.shields.io/badge/Node.js_18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" height="28" /> |
| **npm** | <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" height="28" /> |
| **Git** | <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" height="28" /> |
| **Docker** (Optional) | <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" height="28" /> |
| **MongoDB** | <img src="https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" height="28" /> |

## 🚀 Quick Start

### 1️⃣ Clone the repository

```bash
git clone https://github.com/IqbalHere/BagitUp.git
cd BagitUp
```

### 2️⃣ Install dependencies

<details>
<summary>💻 macOS/Linux & Windows</summary>

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
cd ..
```
</details>

### 3️⃣ Configure Environment

Create `.env` and `.env.local` files by referencing the [Configuration](#-configuration) section below.

### 4️⃣ Seed Database (Optional)

```bash
cd backend
npx ts-node scripts/seedProducts.ts
cd ..
```

### 5️⃣ Run the Application

<details>
<summary>🏃 Using Concurrently (Recommended)</summary>

```bash
npm run dev
```

</details>

<details>
<summary>🐳 Using Docker</summary>

```bash
npm run docker:up
```

</details>

## 🔧 Configuration

> [!NOTE]
> Make sure to grab your API keys from OpenAI/Groq, MongoDB Atlas, and Firebase Console before starting the backend server.

**Backend (`backend/.env`)**

| Variable | Required | Description |
| :--- | :---: | :--- |
| `PORT` | ✅ | Backend API port (default: 4000) |
| `NODE_ENV` | ✅ | `development` or `production` |
| `MONGO_URI` | ✅ | Connection string for MongoDB database |
| `FIREBASE_SERVICE_ACCOUNT` | ✅ | JSON string of Firebase service account key |
| `GROQ_API_KEY` | ❌ | Groq API Key for AI inference (One of AI keys required) |
| `GEMINI_API_KEY` | ❌ | Gemini API Key for AI inference |
| `OPENAI_API_KEY` | ❌ | OpenAI API Key for AI inference |
| `UPSTASH_REDIS_REST_URL` | ❌ | Upstash Redis connection URL |
| `UPSTASH_REDIS_REST_TOKEN` | ❌ | Upstash Redis auth token |
| `STRIPE_SECRET_KEY` | ❌ | Stripe secret key for payments |
| `USE_STRIPE` | ❌ | Set to `true` to enable Stripe integration |

**Frontend (`frontend/.env.local`)**

| Variable | Required | Description |
| :--- | :---: | :--- |
| `NEXT_PUBLIC_API_URL` | ✅ | Backend API URL (default: http://localhost:4000) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ❌ | Stripe publishable key |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | ✅ | Firebase project API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | ✅ | Firebase Auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | ✅ | Firebase Project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | ✅ | Firebase Storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`| ✅ | Firebase Messaging Sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | ✅ | Firebase App ID |

## 📖 API Reference

### Generate Recommendations
`POST /api/recommendations/generate`

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :---: | :--- |
| `tripId` | string | ✅ | - | The ID of the trip |
| `destination` | string | ✅ | - | Travel destination |
| `duration` | number | ✅ | - | Length of the trip in days |
| `weather` | string | ❌ | - | Weather forecast string |

**Example Response:**

```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "category": "Clothing",
        "items": [
          "3x T-Shirts",
          "1x Light Jacket",
          "2x Shorts"
        ]
      },
      {
        "category": "Electronics",
        "items": [
          "Universal Power Adapter",
          "Power Bank"
        ]
      }
    ]
  }
}
```

## 🛡️ Error Handling

| Scenario | Behavior |
| :--- | :--- |
| 🚫 **Invalid API Key** | Backend returns `401 Unauthorized` with clear message |
| 🌐 **Network Timeout** | Frontend shows gracefully animated toast notification |
| 📉 **AI Generation Fail** | Fallback to cached default lists if Redis is enabled |
| 🛠️ **Missing Env Vars** | Server fails to boot and logs exactly which variable is missing |

## 🧰 Development

### Commands

```bash
# Run both frontend & backend concurrently
npm run dev

# Run frontend tests
cd frontend && npm run test

# Run backend tests
cd backend && npm run test

# Lint the codebase
cd frontend && npm run lint
cd backend && npm run lint
```

### Project Structure

```text
📁 BagitUp/
├── 📁 frontend/                 # Next.js Application
│   ├── 📁 app/                 # App router structure
│   ├── 📁 components/          # Reusable UI elements
│   └── 📁 lib/                 # Utils & API integrations
├── 📁 backend/                  # Express API Server
│   ├── 📁 src/                 # Source code
│   │   ├── 📁 config/         # DB & Firebase configs
│   │   ├── 📁 controllers/    # Route controllers
│   │   ├── 📁 models/         # Mongoose models
│   │   └── 📁 routes/         # Express routes
│   └── 📁 scripts/             # Database seeders
├── 📁 shared/                   # Shared TypeScript types
├── ⚙️ docker-compose.yml       # Docker config
└── 📄 package.json              # Workspace setup
```

## 🛠️ Tech Stack

<div align="center">

| Component | Technology | Role |
| :---: | :--- | :--- |
| **Frontend** | <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" height="28" /> | App routing, server-side rendering, and UI |
| **Styling** | <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" height="28" /> | Utility-first responsive styling and UI |
| **Backend** | <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" height="28" /> | RESTful API server and routing |
| **Database** | <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" height="28" /> | NoSQL data persistence |
| **Auth** | <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" height="28" /> | Secure user authentication and management |
| **AI** | <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" height="28" /> | Intelligent recommendation engine |
| **Caching** | <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" height="28" /> | Fast data retrieval via Upstash |
| **Payments** | <img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white" height="28" /> | Monetization and payment processing |

</div>

## 🤝 Contributing

We welcome contributions! Please follow these steps to contribute:

1. **Fork** the repository
2. **Create a branch** for your feature (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open a Pull Request** against the `main` branch

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<br />

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:6C63FF,50:A855F7,100:EC4899&height=120&section=footer&animation=fadeIn" width="100%" />

  <br />

  <p>Built with ❤️ by <a href="https://github.com/IqbalHere">Iqbal</a></p>

  <br />

  <img src="https://img.shields.io/github/stars/IqbalHere/BagitUp?style=social" alt="GitHub stars" />
  <img src="https://img.shields.io/github/forks/IqbalHere/BagitUp?style=social" alt="GitHub forks" />
  <img src="https://img.shields.io/github/issues/IqbalHere/BagitUp?style=social" alt="GitHub issues" />

  <br />
  <br />

  <strong>⭐ Star this repo if you found it useful! ⭐</strong>
</div>
