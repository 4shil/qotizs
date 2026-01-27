# Deploy QuoteVerse to Netlify with API Key

## Your API Ninjas Key
```
18Set8gp6my00OwcLwwFSQo0CFioitxGbUrydRey
```

## Quick Deployment Steps

### Step 1: Go to Netlify

Visit: **https://app.netlify.com/**

- Sign up or login (GitHub login recommended)

### Step 2: Import from GitHub

1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Select repository: **`4shil/quotes-app`**

### Step 3: Configure Build Settings

- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Base directory:** (leave empty)

### Step 4: Add Environment Variable

**IMPORTANT:** Before deploying, add your API key:

1. Click **"Show advanced"** or **"Add environment variables"**
2. Add variable:
   - **Key:** `NEXT_PUBLIC_API_NINJAS_KEY`
   - **Value:** `18Set8gp6my00OwcLwwFSQo0CFioitxGbUrydRey`

### Step 5: Deploy

Click **"Deploy site"**

Wait 2-3 minutes for build to complete.

### Step 6: Your Site is Live!

Your site will be at: `https://[random-name].netlify.app`

**Optional:** Change site name:
1. Go to Site Settings → Site details
2. Click "Change site name"
3. Enter: `quotesash` (or whatever you want)
4. Your URL becomes: `https://quotesash.netlify.app`

## Important Notes

### API Tier Information

Your API key is on the **free tier**, which means:
- ✅ Random quotes work
- ❌ Category filtering requires premium
- ✅ Search by text/author works
- ✅ 50,000 requests/month

The app has been updated to work perfectly with the free tier!

### After Deployment

1. Test your site - it should load quotes immediately
2. Update GitHub repo with new URL:
   ```bash
   gh repo edit --homepage "https://your-site.netlify.app"
   ```

## Troubleshooting

**If quotes don't load:**
1. Check Site Settings → Environment variables
2. Make sure `NEXT_PUBLIC_API_NINJAS_KEY` is set correctly
3. Trigger a new deployment (Deploys → Trigger deploy)

**Need help?** Let me know!
