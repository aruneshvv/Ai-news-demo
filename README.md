# AI in Web Engineering News

A real-time news aggregator that uses Google's Gemini API with Search grounding to surface the latest developments in AI-powered web engineering.

## What It Does

Opens a clean dashboard that fetches and summarizes the latest news about AI in web development — frameworks, tools, techniques, and industry trends. Powered by Gemini's grounded search, so every article links back to its original source.

## Built With

- **React 19** + TypeScript
- **Vite** for fast builds and HMR
- **Google Gemini API** with Search grounding for real-time results
- **Tailwind CSS** for styling

## Quick Start

1. Clone the repo:
   ```bash
   git clone https://github.com/aruneshvv/Ai-news-demo.git
   cd Ai-news-demo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add your Gemini API key to `.env.local`:
   ```
   GEMINI_API_KEY=your-key-here
   ```
   Get a free key at [aistudio.google.com](https://aistudio.google.com/apikey)

4. Run the app:
   ```bash
   npm run dev
   ```

## How It Works

The app calls Gemini with Search grounding enabled, asking it to find and summarize recent AI + web engineering news. Each result includes:

- **Headline and summary** — generated from real, current sources
- **Source links** — grounded citations you can click through to verify
- **Category context** — organized by topic area

## Origin

Built with [Google AI Studio](https://ai.studio) as a demonstration of Gemini's grounded search capabilities for real-time content aggregation.

## License

MIT
