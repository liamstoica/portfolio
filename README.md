# Liam Stoica — Portfolio

Personal portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Clean, minimal design** with light/dark mode
- **Mobile-first responsive** layouts
- **AI chat assistant** powered by Claude
- **Case study templates** with sticky navigation
- **Sandbox explorations** section
- **WCAG accessible** with proper semantics and contrast

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Add your Anthropic API key to .env.local
# ANTHROPIC_API_KEY=your_key_here

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── work/[slug]/       # Project detail pages
│   ├── sandbox/[slug]/    # Sandbox pages
│   └── api/chat/          # Chat API route
├── components/
│   ├── chat/              # AI chat components
│   └── ui/                # Reusable UI components
├── content/               # Markdown content for AI
└── lib/                   # Data and utilities
```

## Adding Content

### Projects
Edit `src/lib/data.ts` to add or modify projects. Each project needs:
- `slug`: URL-friendly identifier
- `title`: Display name
- `description`: Short description
- `role`: Your role
- `color`: Tile background color

### Case Studies
Customize the content in `src/app/work/[slug]/page.tsx` or implement markdown-based content loading.

### AI Chat Context
Add content to `src/content/` to train the chat assistant:
- `context.md`: General information
- `case-studies/`: Project writeups
- `linkedin-posts/`: Post archives

## Customization

### Colors & Theme
Edit CSS variables in `src/app/globals.css`:
- `--background`
- `--foreground`
- `--muted`
- `--border`
- `--accent`

### Typography
The site uses system fonts by default. To add custom fonts:
1. Add font files to `public/fonts/`
2. Update `--font-sans` and `--font-mono` in `globals.css`
3. Import fonts in `layout.tsx`

## Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy via Vercel CLI or GitHub integration
```

### Environment Variables
Set these in your deployment platform:
- `ANTHROPIC_API_KEY`: Your Claude API key

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **AI**: Anthropic Claude API

## License

Private - All rights reserved.
















