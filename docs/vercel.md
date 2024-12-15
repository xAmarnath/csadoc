---
title: Vercel Deployment Guide - React + Express Full Stack
---

# Deploying React + Express to Vercel: Complete Guide 🚀

This guide walks you through deploying a full-stack React and Express application to Vercel, including setting up environment variables and configuring the project structure.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Configuration Files](#configuration-files)
3. [Environment Setup](#environment-setup)
4. [Deployment Process](#deployment-process)
5. [Troubleshooting](#troubleshooting)

## Project Structure 📁

First, let's organize our project structure. For Vercel deployment, we'll use a monorepo structure:

```
your-project/
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── api/                    # Express backend
│   ├── index.js           # Main Express app
│   └── package.json
├── package.json           # Root package.json
└── vercel.json           # Vercel configuration
```

### Setting Up the Project

1. **Create the directory structure:**

```bash
mkdir -p your-project/{client,api}
cd your-project
```

2. **Initialize the root package.json:**

```bash
npm init -y
```

3. **Set up the client (React):**

```bash
cd client
npm create vite@latest . -- --template react
```

4. **Set up the API (Express):**

```bash
cd ../api
npm init -y
npm install express cors mongodb dotenv
```

## Configuration Files ⚙️

### 1. Root package.json

```json
{
  "name": "your-project",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "client",
    "api"
  ],
  "scripts": {
    "dev": "concurrently \"npm run dev:client\" \"npm run dev:api\"",
    "dev:client": "cd client && npm run dev",
    "dev:api": "cd api && npm run dev",
    "build": "cd client && npm run build",
    "start": "cd api && npm start"
  },
  "devDependencies": {
    "concurrently": "^8.0.0"
  }
}
```

### 2. vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    },
    {
      "src": "client/dist",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "api/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "client/dist/$1"
    }
  ]
}
```

### 3. API Configuration (api/index.js)

```javascript
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const client = new MongoClient(process.env.MONGO_URI);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Connect to MongoDB and start server
async function start() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

start();

// Export for Vercel
module.exports = app;
```

### 4. Client Configuration (client/vite.config.js)

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
```

## Environment Setup 🔐

### 1. Local Development (.env)

Create a `.env` file in your API directory:

```
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

### 2. Vercel Environment Variables

1. Go to your Vercel dashboard
2. Select your project
3. Click on "Settings" → "Environment Variables"
4. Add the following variables:
   - `MONGO_URI`: Your MongoDB connection string
   - Any other environment variables your app needs

::: tip Important!
Never commit your `.env` file to version control! Add it to `.gitignore`.
:::

## Deployment Process 🚀

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Deploy Your Application

```bash
vercel
```

### 4. Configure Build Settings

In your Vercel dashboard:

1. Go to Project Settings → Build & Development Settings
2. Set the following:
   - Build Command: `npm run build`
   - Output Directory: `client/dist`
   - Install Command: `npm install`

## Troubleshooting 🔧

### Common Issues and Solutions

1. **API Routes Not Working**

   - Check your `vercel.json` routes configuration
   - Ensure API routes start with `/api/`
   - Verify environment variables are set in Vercel dashboard

2. **Build Failures**

   - Check build logs in Vercel dashboard
   - Verify all dependencies are listed in package.json
   - Ensure build scripts are correct

3. **MongoDB Connection Issues**

   - Verify MONGO_URI is set correctly in Vercel
   - Check if IP whitelist includes Vercel's IPs
   - Enable "Allow access from anywhere" in MongoDB Atlas

4. **CORS Errors**
   - Update your CORS configuration:
   ```javascript
   app.use(cors({
     origin: process.env.NODE_ENV === 'production'
       ? 'your-production-domain.vercel.app'
       : 'http://localhost:5173'
   }));
   ```

### Best Practices 🌟

1. **Environment Variables**

   - Use different variables for development and production
   - Never expose sensitive data in client-side code
   - Use `.env.example` to document required variables

2. **API Organization**

   - Keep API routes modular and organized
   - Use middleware for common functionality
   - Implement proper error handling

3. **Performance**

   - Optimize your build output
   - Use caching when possible
   - Implement proper MongoDB indexes

4. **Monitoring**
   - Use Vercel Analytics
   - Implement error tracking
   - Monitor API performance

## Next Steps 🎯

1. Set up continuous deployment with GitHub
2. Add custom domains
3. Implement monitoring and logging
4. Set up staging environments
5. Optimize for production

::: tip Need Help?

- Check [Vercel Documentation](https://vercel.com/docs)
- Visit [Vercel GitHub](https://github.com/vercel/vercel)
- Join [Vercel Discord](https://vercel.com/discord)
  :::

Remember to always test your deployment in a staging environment before going to production. Happy deploying! 🚀
