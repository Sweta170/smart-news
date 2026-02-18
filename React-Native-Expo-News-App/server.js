const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const KEY = process.env.NEWS_API_KEY;

const MOCK_ARTICLES = [
  {
    source: { id: "the-verge", name: "The Verge" },
    author: "Mock Author",
    title: "Future of Tech: What to Expect in 2026 (Mock Data)",
    description: "This is a placeholder article because no API key was provided. The interface is working correctly!",
    url: "https://www.theverge.com",
    urlToImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    publishedAt: new Date().toISOString(),
    content: "This is sample content for the mock article..."
  },
  {
    source: { id: "techcrunch", name: "TechCrunch" },
    author: "Jane Doe",
    title: "Crypto Markets Rally as New Features Launch",
    description: "Another sample article to demonstrate the UI cards. Glassmorphism looks great here.",
    url: "https://techcrunch.com",
    urlToImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    publishedAt: new Date().toISOString(),
    content: "More sample content..."
  },
  {
    source: { id: "wired", name: "Wired" },
    author: "John Smith",
    title: "The Rise of AI in Everyday Apps",
    description: "Artificial intelligence is becoming ubiquitous in mobile development.",
    url: "https://www.wired.com",
    urlToImage: "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=80",
    publishedAt: new Date().toISOString(),
    content: "Even more sample content..."
  },
  {
    source: { id: "bbc", name: "BBC News" },
    author: "BBC",
    title: "Global innovations in renewable energy",
    description: "Scientists make breakthrough in solar panel efficiency.",
    url: "https://www.bbc.com",
    urlToImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    publishedAt: new Date().toISOString(),
    content: "Sustainable energy is the future..."
  }
];

if (!KEY) {
  console.warn('Warning: NEWS_API_KEY is not set. The proxy will return MOCK DATA.');
}

app.get('/news', async (req, res) => {
  try {
    const { category = 'technology', q } = req.query;

    // If no key is set, immediately return mock data
    if (!KEY) {
      console.log('Serving mock data (No API Key)');
      return res.json({ status: "ok", totalResults: MOCK_ARTICLES.length, articles: MOCK_ARTICLES });
    }

    let url = `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${KEY}`;
    if (q) url += `&q=${encodeURIComponent(q)}`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.error('API Request Failed, serving mock data:', err.message);
    // Fallback to mock data on error too
    res.json({
      status: "ok",
      totalResults: MOCK_ARTICLES.length,
      articles: MOCK_ARTICLES,
      _warning: "Served from mock data due to API error"
    });
  }
});

app.listen(PORT, () => {
  console.log(`News proxy listening on http://localhost:${PORT}`);
});
