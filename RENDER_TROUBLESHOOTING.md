# Render Deployment Troubleshooting Guide

## Memory Issues (CRITICAL FIX APPLIED)

### Problem: "JavaScript heap out of memory"
**Status:** ✅ FIXED

The free tier on Render has 512MB RAM. We've applied these fixes:

1. **Node.js Memory Limit** - Set to 460MB (below the 512MB limit)
   ```json
   "start": "node --max-old-space-size=460 dist/index.js"
   ```

2. **Disabled Mongoose Auto-Indexing** in production (saves memory)

3. **Optimized Firebase Initialization** - Now supports individual env vars

### Environment Variable Names (IMPORTANT)

Make sure you use the CORRECT variable names in Render:

- ✅ `MONGODB_URI` (NOT `MONGO_URI`)
- ✅ `FIREBASE_PROJECT_ID`
- ✅ `FIREBASE_PRIVATE_KEY`
- ✅ `FIREBASE_CLIENT_EMAIL`

The app now supports BOTH `MONGODB_URI` and `MONGO_URI` for backwards compatibility.

## Required Environment Variables

Set these in your Render Dashboard (https://dashboard.render.com):

```bash
NODE_ENV=production
PORT=4000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYour-Key-Here\n-----END PRIVATE KEY-----
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
CORS_ORIGIN=https://your-frontend.vercel.app
GROQ_API_KEY=your-groq-api-key
STRIPE_SECRET_KEY=sk_test_or_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
GEMINI_API_KEY=your-gemini-api-key
```

### Firebase Private Key Format

The `FIREBASE_PRIVATE_KEY` should include the `\n` characters (the code will convert them):

```
-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhki...\n-----END PRIVATE KEY-----
```

## Common Deployment Errors

### 1. Port Scan Timeout
**Symptom:** "No open ports detected, continuing to scan..."

**Causes:**
- App crashed before opening port (check logs for errors)
- Memory issues (heap out of memory)
- Missing environment variables causing startup failure

**Solutions:**
- ✅ Check that all required env vars are set
- ✅ Review startup logs for errors
- ✅ Verify MongoDB connection string is correct
- ✅ Ensure Firebase credentials are valid

### 2. Build Failed
**Symptom:** "Build failed 😞"

**Causes:**
- Missing TypeScript type definitions
- Missing dependencies

**Solutions:**
- ✅ TypeScript and types are now in dependencies (not devDependencies)
- ✅ Run `npm install` locally to verify package.json

### 3. MongoDB Connection Failed
**Symptom:** MongoDB connection error in logs

**Solutions:**
- Verify `MONGODB_URI` is set correctly
- Check MongoDB Atlas allows connections from 0.0.0.0/0
- Ensure database user has correct permissions

### 4. Firebase Initialization Failed
**Symptom:** Firebase Admin SDK initialization failed

**Solutions:**
- Verify all three Firebase env vars are set:
  - `FIREBASE_PROJECT_ID`
  - `FIREBASE_PRIVATE_KEY`
  - `FIREBASE_CLIENT_EMAIL`
- Check that private key includes `\n` characters
- Verify credentials are from the correct Firebase project

## Monitoring Your Deployment

### Check Service Status
Visit: https://dashboard.render.com/web/srv-d45rqkvdiees738fo8c0

### View Live Logs
Click "Logs" in the Render Dashboard or use the Render MCP tools

### Test Endpoints
```bash
# Health check
curl https://bagitup.onrender.com/health

# API info
curl https://bagitup.onrender.com/
```

## Performance Tips for Free Tier

1. **Service Sleep** - Free tier services sleep after 15 min of inactivity
   - First request after sleep takes 30-50 seconds
   - Keep-alive ping not recommended (waste of resources)

2. **Memory Management**
   - We've set Node.js heap to 460MB (safe for 512MB limit)
   - Mongoose auto-indexing disabled in production
   - Connection timeouts set to reasonable values

3. **Database Optimization**
   - Use MongoDB Atlas free tier (512MB storage)
   - Create indexes manually (not auto-indexed)
   - Use lean queries where possible

## Upgrade Considerations

If you need better performance:

1. **Starter Plan ($7/month)**
   - No sleep
   - More memory (512MB guaranteed)
   - Better for production

2. **Standard Plan ($25/month)**
   - 2GB memory
   - Horizontal scaling
   - Custom domains with SSL

## Next Steps After Successful Deployment

1. ✅ Verify all environment variables are set
2. ✅ Test all API endpoints
3. ✅ Update frontend `NEXT_PUBLIC_API_URL` to `https://bagitup.onrender.com`
4. ✅ Test authentication flow
5. ✅ Monitor logs for any errors
6. ✅ Set up error tracking (Sentry, LogRocket)

## Support

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
- This project: https://github.com/IqbalHere/BagitUp

---

**Last Updated:** November 6, 2025
**Fixes Applied:**
- ✅ Node.js memory limit optimization
- ✅ TypeScript dependencies fix
- ✅ MongoDB URI compatibility
- ✅ Firebase env var improvements
