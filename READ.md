# ISRO Crop Monitoring Dashboard

## Overview
Frontend dashboard for satellite-based crop monitoring in Odisha region using Sentinel-1 and Sentinel-2 data.

## Tech Stack
- **Frontend**: Vue.js 3 + Vite
- **State Management**: Pinia
- **Routing**: Vue Router
- **Styling**: Tailwind CSS
- **Charts**: Chart.js
- **Maps**: Leaflet
- **Package Manager**: npm

## Features
✅ Dashboard with statistics
✅ Field monitoring
✅ Alert management
✅ Farmer profile
✅ Responsive design
✅ Mock data integration
✅ Ready for backend API integration

## Project Structure
src/

├── pages/           # Vue pages
│   ├── Dashboard.vue
│   ├── FieldDetail.vue
│   ├── AlertsPage.vue
│   ├── FarmerProfile.vue
│   └── NotFound.vue
├── stores/          # Pinia stores
│   ├── fieldStore.js
│   ├── alertStore.js
│   └── userStore.js
├── data/            # Mock data
│   ├── mockFields.js
│   ├── mockFarmers.js
│   └── mockAlerts.js
├── assets/          # CSS & static files
├── App.vue          # Root component
├── main.js          # Entry point
└── router.js        # Route config


## Installation
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Deployment
Deploy to Vercel/Netlify:
```bash
npm run build
# Upload 'dist' folder
```

## Backend Integration
This frontend is ready for API integration once backend APIs are available:
- GET /api/fields
- GET /api/alerts
- POST /api/sms
- etc.

## Team
- **Frontend**: Ankita Singh
- **Backend**: [Team Member Names]
- **ML/Data**: [Team Member Names]

## License
MIT

## For Hackathon
CodeUdaan / Bharatiya Antariksh Hackathon 2026