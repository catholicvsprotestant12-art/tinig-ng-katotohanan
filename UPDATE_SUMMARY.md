# Update Summary

## Added Features

- Admin login portal for the web app.
- Default admin credentials:
  - Username: `admin`
  - Password: `admin123`
- Logout button in the main app header.
- Bible verse dropdowns by book and verse.
- `Use Verse` action to fill the post form automatically.
- Modernized visual design with cleaner panels, rounded controls, polished tabs, and a soft page background.
- File and folder upload organizer.
- File movement between tabs:
  - Bible Verse
  - Evidence
  - Deliverance Prayer
  - Apologetics
- In-app file previews for images, PDFs, video, audio, and text-like files.
- Vercel configuration through `vercel.json`.

## Verification

The app was checked with:

```bash
npm run lint
npm run build
```

Both commands passed successfully.

## Security Note

The current admin login is client-side only and is intended for a simple prototype. For a public production app, authentication should be moved to a server-backed system with protected routes, sessions, hashed passwords, and database storage.

## Storage Note

Posts are saved in browser `localStorage`, and uploaded files are kept as browser object URLs for the current session. For shared public storage across users, connect a hosted storage service such as Vercel Blob, Supabase Storage, or another database-backed file store.
