# 🌾 ISRO Crop Monitoring Dashboard

AI-powered satellite monitoring system for crop health and irrigation management in Odisha.

## 🚀 Features

- 📊 Real-time crop health monitoring using satellite data (NDVI, NDWI, EVI)
- 💧 Soil moisture analysis and irrigation recommendations
- ⚠️ Automated alerts for crop stress and pest risks
- 📱 SMS advisory delivery to farmers
- 📈 Historical trend analysis and yield predictions
- 🗺️ Interactive field mapping and visualization

## 🛠️ Tech Stack

- **Frontend:** Vue.js 3 + Vite
- **Styling:** Tailwind CSS
- **State Management:** Pinia
- **Charts:** Chart.js
- **Maps:** Leaflet
- **HTTP Client:** Axios

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/crop-monitoring-dashboard

# Install dependencies
npm install

# Install Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Start development server
npm run dev
```

## 🔧 Configuration

Create a `.env` file based on `.env.example`:

```env
VITE_API_URL=http://localhost:8000/api
VITE_ENABLE_MOCK_DATA=true
```

## 📁 Project Structure