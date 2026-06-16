# Vercel Deployment Audit Report

## Detected Tech Stack
- **Core Framework**: React 19
- **Routing & SSR**: TanStack Start
- **Build Tool**: Vite (custom configuration via `@lovable.dev/vite-tanstack-config`)
- **Styling System**: Tailwind CSS v4 with Radix UI primitives
- **Language**: TypeScript
- **Package Manager**: Bun (detected via `bun.lock` and `bunfig.toml`)

## Project Structure Analysis
- **Entry Points**: 
  - **Server-side**: `src/server.ts` handles SSR rendering and catches/normalizes SSR errors.
  - **Client-side**: `src/start.ts` and `src/router.tsx` are responsible for the client hydration and route definitions.
- **Static Assets Handling**: Static files are appropriately handled via the standard Vite asset pipeline within the `src/assets` directory.

## Issues Found (Deployment Blockers)
1. **Incorrect Server/Nitro Build Target**: 
   The configuration in `vite.config.ts` explicitly relies on the Lovable TanStack configuration, which defaults to a **Cloudflare** build target for the server engine (Nitro). When deployed to Vercel without overriding this, Vercel cannot properly resolve the server output paths, resulting in severe **404 Not Found** errors across all pages.

## Recommended Changes
1. **Modify `vite.config.ts`**:
   - **Reason**: We must explicitly override the server target to use the Vercel Build Output API format by setting the appropriate preset in the config.
   - **Details**: Added `preset: "vercel"` within a top-level `nitro` object to instruct the build step to use the Vercel preset, creating a `.vercel/output` directory.
2. **Add Vercel Analytics**:
   - **Reason**: To monitor page views and core web vitals.
   - **Details**: Installed `@vercel/analytics` and added `<Analytics />` to the Root route component.

## Potential Risks
- **Over-engineering**: TanStack Start acts as a full-stack framework. Even though you are building a frontend-only site, Vercel will deploy Serverless Functions to handle SSR (Server-Side Rendering). This is perfectly fine, but keep in mind that route requests will hit Vercel Functions rather than just static CDN edge nodes.
