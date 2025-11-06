# Frontend Environment Variables Setup

## Vercel Environment Variables

Add these environment variables in your Vercel project settings:
(Dashboard → Your Project → Settings → Environment Variables)

### Required Variables

```env
# Backend API URL (Render)
NEXT_PUBLIC_API_URL=https://bagitup.onrender.com

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Google Gemini API (for client-side calls if any)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# Stripe Public Key (for client-side)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## How to Set in Vercel

1. Go to https://vercel.com/dashboard
2. Select your project (BagitUp frontend)
3. Click "Settings" → "Environment Variables"
4. Add each variable:
   - Variable Name: (e.g., `NEXT_PUBLIC_API_URL`)
   - Value: (e.g., `https://bagitup.onrender.com`)
   - Environments: Select "Production", "Preview", and "Development"
5. Click "Save"
6. Redeploy your project for changes to take effect

## Local Development (.env.local)

Create a `.env.local` file in the `frontend` directory:

```env
# Backend API URL (local development)
NEXT_PUBLIC_API_URL=http://localhost:4000

# Firebase Configuration (get from Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# API Keys
NEXT_PUBLIC_GEMINI_API_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

## Backend Environment Variables (Render)

Verify these are set in Render Dashboard:

```env
NODE_ENV=production
PORT=4000
MONGODB_URI=your_mongodb_connection_string
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
CORS_ORIGIN=https://your-frontend.vercel.app,https://www.yoursite.com
GROQ_API_KEY=your_groq_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
GEMINI_API_KEY=your_gemini_api_key
```

## Important Notes

### CORS Configuration
Make sure your backend `CORS_ORIGIN` includes your Vercel frontend URL:
```
CORS_ORIGIN=https://your-app.vercel.app,https://your-custom-domain.com
```

### API URL
- **Production:** `https://bagitup.onrender.com`
- **Local Development:** `http://localhost:4000`

### Security
- ✅ All sensitive keys should be in environment variables
- ✅ Never commit `.env.local` to git
- ✅ Use `NEXT_PUBLIC_` prefix only for client-side variables
- ✅ Keep backend API keys (without NEXT_PUBLIC_) secret

## Testing

After setting environment variables:

1. **Test Backend Connection:**
   ```bash
   curl https://bagitup.onrender.com/health
   ```

2. **Test Frontend API Client:**
   ```javascript
   // In browser console on your deployed frontend
   console.log(process.env.NEXT_PUBLIC_API_URL)
   // Should output: https://bagitup.onrender.com
   ```

3. **Verify CORS:**
   - Open your deployed frontend
   - Open browser DevTools → Network tab
   - Try to login or make an API call
   - Should NOT see CORS errors

## Troubleshooting

### "Network Error" or "Failed to fetch"
- Check `NEXT_PUBLIC_API_URL` is set correctly
- Verify backend is running: visit https://bagitup.onrender.com/health
- Check browser console for CORS errors

### CORS Errors
- Update backend `CORS_ORIGIN` to include your Vercel URL
- Redeploy backend after updating CORS settings

### Firebase Auth Not Working
- Verify all Firebase config variables are set
- Check Firebase project settings match the values
- Ensure Firebase Auth is enabled in Firebase Console

### Stripe Integration Issues
- Verify both public and secret keys are correct
- Test mode vs. live mode keys should match
- Check webhook secret is configured correctly

---

**Last Updated:** November 6, 2025
