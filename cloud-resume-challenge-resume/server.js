// ============================================
// James Adewara Resume - Visitor Counter API
// Node.js + Express + MongoDB Backend
// ============================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: '*', // In production, restrict this to your domain
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// ============================================
// MONGODB CONNECTION
// ============================================
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/resume_counter';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// ============================================
// SCHEMAS
// ============================================
const VisitorSchema = new mongoose.Schema({
  count: { 
    type: Number, 
    default: 0 
  },
  visits: [{
    timestamp: { type: Date, default: Date.now },
    page: String,
    referrer: String,
    ip: String,
    userAgent: String,
    country: String,
    city: String
  }]
}, { timestamps: true });

const Visitor = mongoose.model('Visitor', VisitorSchema);

// ============================================
// INITIALIZE COUNTER
// ============================================
async function initCounter() {
  try {
    const exists = await Visitor.findOne();
    if (!exists) {
      await Visitor.create({ count: 0, visits: [] });
      console.log('✅ Visitor counter initialized');
    } else {
      console.log(`✅ Counter exists. Current count: ${exists.count}`);
    }
  } catch (err) {
    console.error('❌ Error initializing counter:', err);
  }
}

// ============================================
// API ROUTES
// ============================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// GET /api/visits - Get current visitor count
app.get('/api/visits', async (req, res) => {
  try {
    const doc = await Visitor.findOne();
    res.json({ 
      count: doc ? doc.count : 0,
      lastUpdated: doc ? doc.updatedAt : null
    });
  } catch (err) {
    console.error('Error fetching visits:', err);
    res.status(500).json({ error: 'Failed to fetch visitor count' });
  }
});

// POST /api/visit - Record a new visit
app.post('/api/visit', async (req, res) => {
  try {
    const visitData = {
      timestamp: new Date(),
      page: req.body.page || '/',
      referrer: req.body.referrer || 'direct',
      ip: req.headers['x-forwarded-for'] || req.ip,
      userAgent: req.headers['user-agent'] || 'unknown'
    };

    const doc = await Visitor.findOneAndUpdate(
      {},
      { 
        $inc: { count: 1 },
        $push: { visits: visitData }
      },
      { new: true, upsert: true }
    );

    res.json({ 
      count: doc.count,
      message: 'Visit recorded successfully'
    });
  } catch (err) {
    console.error('Error recording visit:', err);
    res.status(500).json({ error: 'Failed to record visit' });
  }
});

// GET /api/visits/details - Get detailed visit analytics (admin)
app.get('/api/visits/details', async (req, res) => {
  try {
    const doc = await Visitor.findOne();
    if (!doc) {
      return res.json({ count: 0, visits: [] });
    }

    // Get last 50 visits
    const recentVisits = doc.visits.slice(-50).reverse();

    res.json({
      count: doc.count,
      recentVisits: recentVisits,
      totalVisits: doc.visits.length
    });
  } catch (err) {
    console.error('Error fetching details:', err);
    res.status(500).json({ error: 'Failed to fetch details' });
  }
});

// ============================================
// ERROR HANDLING
// ============================================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ============================================
// START SERVER
// ============================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await initCounter();
});

module.exports = app;