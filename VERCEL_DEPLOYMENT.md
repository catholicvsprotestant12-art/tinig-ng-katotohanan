# Vercel Deployment Guide

## Best Option: Deploy From GitHub

1. Push this project to a GitHub repository.
2. Go to https://vercel.com/new.
3. Choose **Import Git Repository**.
4. Select this project repository.
5. Keep the detected framework as **Next.js**.
6. Keep the default build settings:
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: Next.js default
7. Click **Deploy**.

After deployment, Vercel will give you a live production URL. Every future push to the production branch will trigger a new deployment.

## Optional: Deploy With Vercel CLI

From the project root:

```bash
npm install -g vercel
vercel login
vercel
vercel --prod
```

The first `vercel` command creates a preview deployment. `vercel --prod` publishes the production deployment.

## Important Content Note

The current app is a standalone public blog with static posts defined in the codebase. This works on Vercel without extra services. To publish posts from a dashboard later, connect a CMS or database-backed content source.
