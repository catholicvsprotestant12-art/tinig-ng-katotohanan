# Repository Summary

## Overview

`tinig-ng-katotohanan-web` is a private Next.js web application created from the default `create-next-app` scaffold. The project currently contains the starter App Router page and default static assets, with Tailwind CSS configured for styling.

## Tech Stack

- Next.js `16.2.6`
- React `19.2.4`
- TypeScript
- Tailwind CSS v4
- ESLint 9 with `eslint-config-next`

## Project Structure

- `app/` - Main App Router source files.
- `app/page.tsx` - Default starter home page.
- `app/layout.tsx` - Root layout, metadata, and Geist font setup.
- `app/globals.css` - Global styles, Tailwind import, theme variables, and color-scheme defaults.
- `public/` - Static SVG assets from the starter template.
- `next.config.ts` - Next.js configuration placeholder.
- `package.json` - Project scripts and dependencies.

## Available Scripts

- `npm run dev` - Start the local development server.
- `npm run build` - Build the production application.
- `npm run start` - Start the production server after building.
- `npm run lint` - Run ESLint.

## Current State

The application is in its initial scaffolded state. The home page still displays the default Next.js starter content, and the metadata in `app/layout.tsx` uses the generated title and description.

## Notes for Future Work

- Update `app/page.tsx` with the actual site experience.
- Replace default metadata in `app/layout.tsx`.
- Remove unused starter assets from `public/` once the final design is known.
- Before changing Next.js behavior or APIs, check `node_modules/next/dist/docs/` because this repo uses a newer Next.js version with project-specific guidance in `AGENTS.md`.
