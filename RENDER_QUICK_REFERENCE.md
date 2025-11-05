# Render Quick Reference Card

⚠️ **SECURITY NOTE:** Replace all placeholder values (shown as `<...>`) with actual values from your local `.env` file. Never commit real secrets to Git.

## 🎯 Copy-Paste Values for Render Dashboard

### Service Configuration

```
Name: bagitup-backend
Branch: main
Root Directory: backend
Environment: Node
Build Command: npm install && npm run build
Start Command: npm run start
```

### Environment Variables

Copy these exactly into Render's Environment Variables section:

```bash
NODE_ENV=production
```

```bash
MONGO_URI=<Your MongoDB Atlas connection string>
```

```bash
FIREBASE_SERVICE_ACCOUNT=<Copy the entire JSON from your .env file>
```

**Note:** Copy the complete Firebase JSON object from your local `.env` file. It should start with `{"type":"service_account"...` and include the private key.

```bash
GROQ_API_KEY=your_groq_api_key_here
```

```bash
GEMINI_API_KEY=<Your Gemini API key>
```

```bash
UPSTASH_REDIS_REST_URL=<Your Upstash Redis URL>
```

```bash
UPSTASH_REDIS_REST_TOKEN=<Your Upstash Redis token>
```

```bash
JWT_SECRET=<Your JWT secret - generate a new one for production>
```

```bash
CORS_ORIGIN=http://localhost:3000
```

```bash
USE_STRIPE=false
```

```bash
STRIPE_SECRET_KEY=sk_test_1234567890abcdef
```

### Important Notes

⚠️ **CRITICAL: Root Directory MUST be set to `backend`**

⚠️ Update `CORS_ORIGIN` after deploying frontend:
```bash
CORS_ORIGIN=https://your-frontend-url.onrender.com,http://localhost:3000
```

⚠️ Update `GROQ_API_KEY` with your actual key from https://console.groq.com/keys

### Expected Build Output

```
✓ Build successful
Server is running on port 10000
Environment: production
MongoDB connected successfully
```

### Test After Deployment

```bash
curl https://your-service-name.onrender.com/health
```

Expected: `{"status":"OK","timestamp":"..."}`
