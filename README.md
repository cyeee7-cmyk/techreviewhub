# TechReviewHub

A modern SEO-focused tech review website built with Next.js 15, TailwindCSS, TypeScript, and Shadcn UI.

## Features

- SEO-optimized blog system with dynamic metadata and JSON-LD schema
- Magazine-style homepage layout
- Product reviews, comparisons, and buying guides
- WordPress-style Deals section with coupon codes
- Dark mode support
- Responsive design
- Affiliate marketing optimization
- Sitemap and robots.txt generation

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
NEXT_PUBLIC_SITE_URL=https://techreviewhub.com

# Notion content source
NOTION_API_KEY=your_notion_api_key
NOTION_DATA_SOURCE_ID=your_notion_data_source_id
REVALIDATION_SECRET=your_revalidation_secret

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB_NAME=techreviewhub

# SMTP email
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=no-reply@example.com
SMTP_PASS=your_smtp_password
SMTP_FROM_EMAIL=no-reply@example.com
CONTACT_FORM_TO_EMAIL=hello@example.com
```

## Added Features

- MongoDB-backed email verification login
- Contact form submission API with SMTP notification delivery
- Session cookie authentication with login, session, and logout routes
- Persistent storage for users, verification codes, sessions, and contact messages

## Deploy on Vercel

Import the GitHub repository on [Vercel](https://vercel.com) and set the environment variable `NEXT_PUBLIC_SITE_URL`.
