# Update Summary

## Added Features

- Standalone public blog experience for Tinig ng Katotohanan.
- Category filters for:
  - Bible Verse
  - Evidence
  - Deliverance Prayer
  - Apologetics
- Featured post layout with latest post cards.
- New site logo in the page header, footer, and browser tab icon.
- Modernized visual design with cleaner panels, rounded controls, polished category tabs, and a soft page background.
- Vercel configuration through `vercel.json`.

## Removed Features

- Admin login and admin management popover.
- File and folder upload controls.
- File download controls.
- In-browser file previews and file tab management.

## Verification

The app was checked with:

```bash
npm run lint
npm run build
```

Both commands passed successfully.

## Content Note

The current blog posts are local static content inside the app component. To publish new posts without code edits, connect a CMS or database-backed content source later.
