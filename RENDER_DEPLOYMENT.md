# Render Deployment Guide for BagitUp Backend

## ✅ Production-Ready Status

Your backend is **production-ready** with the following configuration:

### Current Setup
- ✅ TypeScript compiles to `dist/` folder
- ✅ Server binds to `process.env.PORT` (Render assigns this automatically)
- ✅ Production scripts configured (`build` + `start`)
- ✅ `.dockerignore` configured
- ✅ Health endpoint available at `/health`
- ✅ Graceful shutdown implemented
- ✅ Security middleware (helmet, cors) configured
- ✅ Changes committed and pushed to `main` branch

---

## 🚀 Render Dashboard Configuration

### Step 1: Create New Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `IqbalHere/BagitUp`

### Step 2: Configure Service Settings

Fill in the following fields **exactly** as shown:

| Field | Value |
|-------|-------|
| **Name** | `bagitup-backend` (or your preferred name) |
| **Region** | Choose closest to your users |
| **Branch** | `main` |
| **Root Directory** | `backend` ⚠️ **IMPORTANT** |
| **Environment** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm run start` |
| **Instance Type** | Free (or choose paid plan) |

### Step 3: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add these:

#### Required Variables:

```bash
# MongoDB Configuration
MONGO_URI=mongodb+srv://romanmohdmadani417:roman417mg@bagitup.ywdssip.mongodb.net/?appName=BagitUp

# Firebase Admin SDK (paste your JSON as-is)
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"bagitup-2b4ee",...}

# AI Configuration
GROQ_API_KEY=your_groq_api_key_here
GEMINI_API_KEY=AIzaSyBbzSbTpRvIFop8FwxpcWrH-xMEd6lxAOg

# Upstash Redis
UPSTASH_REDIS_REST_URL=https://flying-stinkbug-14396.upstash.io
UPSTASH_REDIS_REST_TOKEN=ATg8AAIncDJiZWY0Mjc4MTFmYTQ0OTZjODM3NjZmZTdkZTQ4MTI2MnAyMTQzOTY

# JWT Secret
JWT_SECRET=2042ea668cdf2e554df9922069df8364d2af7df7e48fa6c28128c530ab14983a9b0febf2b93600443e99e2cd68f4a1552ef366fde983c88347d03192c091c44f

# Node Environment
NODE_ENV=production

# CORS Origins (update with your Render frontend URL)
CORS_ORIGIN=https://your-frontend-url.onrender.com,http://localhost:3000

# Stripe (optional - set to false if not using)
USE_STRIPE=false
STRIPE_SECRET_KEY=sk_test_1234567890abcdef
```

#### Optional Variables (only if needed):

```bash
# If you encounter memory issues
NODE_OPTIONS=--max_old_space_size=512
```

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Render will automatically deploy your app
3. Wait for the build to complete (5-10 minutes for first deploy)

---

## 📊 Monitoring Deployment

### Watch Build Logs

During deployment, you should see:

```
==> Cloning from https://github.com/IqbalHere/BagitUp...
==> Running build command 'npm install && npm run build'...
    > bagitup-backend@1.0.0 build
    > tsc
==> Build successful!
==> Running start command 'npm run start'...
    > bagitup-backend@1.0.0 start
    > node dist/index.js
    ✅ Firebase Admin SDK initialized
    🚀 Server is running on port 10000
    📝 Environment: production
    ✅ MongoDB connected successfully
==> Your service is live!
```

### Common Build Issues

| Issue | Solution |
|-------|----------|
| `tsc: command not found` | Build command should be `npm install && npm run build` |
| `Cannot find module dist/index.js` | Ensure Root Directory is set to `backend` |
| `Error: listen EADDRINUSE` | Server must use `process.env.PORT` (already configured ✅) |
| `MongoDB connection failed` | Check `MONGO_URI` env variable |
| `Firebase initialization failed` | Verify `FIREBASE_SERVICE_ACCOUNT` JSON is valid |

---

## 🧪 Testing Your Deployment

### 1. Get Your Render URL

After deployment, Render provides a URL like:
```
https://bagitup-backend.onrender.com
```

### 2. Test Health Endpoint

**Windows PowerShell:**
```powershell
Invoke-WebRequest -Uri https://bagitup-backend.onrender.com/health
```

**Git Bash / Linux / macOS:**
```bash
curl https://bagitup-backend.onrender.com/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-11-06T12:34:56.789Z"
}
```

### 3. Test Root Endpoint

```bash
curl https://bagitup-backend.onrender.com/
```

**Expected Response:**
```json
{
  "name": "BagitUp Travel API",
  "version": "2.0.0",
  "status": "running",
  "endpoints": {
    "health": "/health",
    "api": "/api",
    "docs": "/api"
  }
}
```

### 4. Test API Endpoints

```bash
# Example: Get trips
curl https://bagitup-backend.onrender.com/api/trips
```

---

## 🔄 Local Testing (Before Deployment)

To test the production build locally:

### Windows PowerShell:
```powershell
# Navigate to backend
cd c:\Users\smiqb\Desktop\BagitUp\backend

# Install dependencies
npm install

# Build TypeScript
npm run build

# Run production build
$env:PORT="4000"
npm run start
```

### Test locally:
```powershell
# Test health endpoint
Invoke-WebRequest -Uri http://localhost:4000/health

# Or visit in browser
start http://localhost:4000/health
```

### Git Bash / Linux / macOS:
```bash
cd backend
npm install
npm run build
PORT=4000 npm run start
```

```bash
# Test
curl http://localhost:4000/health
```

---

## 🔐 Security Checklist

- ✅ **NEVER** commit `.env` file to git
- ✅ Use Render's Environment Variables UI for all secrets
- ✅ Update `CORS_ORIGIN` with your production frontend URL
- ✅ Set `NODE_ENV=production` in Render
- ✅ Keep Firebase service account JSON in environment variables only
- ✅ Regenerate `JWT_SECRET` for production (use a new secure random string)
- ✅ Use production database credentials (not development)

### Generate New JWT Secret (Recommended):

**PowerShell:**
```powershell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(64))
```

**Git Bash / Linux:**
```bash
openssl rand -hex 64
```

---

## 📝 Post-Deployment Checklist

- [ ] Service deployed successfully
- [ ] Build logs show no errors
- [ ] Health endpoint returns 200 OK
- [ ] API endpoints respond correctly
- [ ] MongoDB connection successful
- [ ] Firebase initialized
- [ ] CORS configured for frontend domain
- [ ] Environment variables all set
- [ ] Frontend updated with backend URL

---

## 🔄 Continuous Deployment

Render automatically redeploys when you push to the `main` branch.

To trigger a manual redeploy:
1. Go to Render Dashboard
2. Select your service
3. Click **"Manual Deploy"** → **"Deploy latest commit"**

---

## 🆘 Troubleshooting

### Server Won't Start

**Check logs for:**
```
Server is running on port XXXXX
```

If missing, verify `process.env.PORT` is used in `src/index.ts` ✅ (already configured)

### Memory Errors (OOM)

Add environment variable:
```
NODE_OPTIONS=--max_old_space_size=512
```

### Database Connection Fails

1. Check `MONGO_URI` is correct
2. Verify MongoDB Atlas allows connections from Render IPs (0.0.0.0/0)
3. Check database user has correct permissions

### CORS Errors

Update `CORS_ORIGIN` to include your frontend URL:
```
CORS_ORIGIN=https://your-frontend.onrender.com,http://localhost:3000
```

---

## 📞 Support

- **Render Docs:** https://render.com/docs
- **Render Status:** https://status.render.com
- **GitHub Repo:** https://github.com/IqbalHere/BagitUp

---

## 🎉 Summary

Your backend is **production-ready** with:

1. ✅ Optimized TypeScript build (`sourceMap: false`)
2. ✅ Proper port binding (`process.env.PORT`)
3. ✅ Production scripts (`npm run build` + `npm run start`)
4. ✅ Security middleware configured
5. ✅ Health check endpoint
6. ✅ Graceful shutdown
7. ✅ Git changes committed and pushed

**Next Steps:**
1. Create Web Service on Render Dashboard
2. Set Root Directory to `backend`
3. Configure environment variables
4. Deploy and test!

Your backend URL will be: `https://bagitup-backend.onrender.com`
