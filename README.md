# QuoteVerse 💬✨

A beautiful, modern quote discovery app built with Next.js and the Soft Neo Brutalism design style.

## Features

- 🎨 Beautiful soft neo-brutalism design
- 💖 Like and bookmark your favorite quotes
- 🔍 Search quotes by text, author, or category
- 📱 Fully responsive (mobile-first)
- 🎯 Random quote generator
- 🔄 Share quotes on social media
- 💾 Persistent favorites (localStorage)

## Tech Stack

- **Framework:** Next.js 15 (React 19)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **API:** API Ninjas Quotes API
- **Deployment:** Netlify

## Getting Started

1. Clone the repo:
```bash
git clone https://github.com/4shil/quotes-app.git
cd quotes-app
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` and add your API key:
```env
NEXT_PUBLIC_API_NINJAS_KEY=your_api_key_here
```

Get your free API key at [api-ninjas.com](https://api-ninjas.com)

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
npm start
```

## Deployment

Deploy to Netlify in one click:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/4shil/quotes-app)

Don't forget to add your `NEXT_PUBLIC_API_NINJAS_KEY` environment variable!

## License

MIT
