# AirGuide — Know your air. Plan your day.

**AirGuide** is a consumer-facing web application that predicts Air Quality Index (AQI) levels for metropolitan cities and delivers personalized outdoor activity recommendations based on the user's age and health record.

---

## 🌟 Key Features
- **Personalized Health Advisory**: Tailors activity safety guidance based on User Profile (Name, Age Group: Child/Adult/Elderly, Health Condition: Healthy/Asthma/CVD).
- **Hero AQI Card**: Prominently displays predicted AQI score, category badge, and personalized action statement.
- **"What Should I Do Today?" Activity Cards**: Instant safety indicators for Walking, Running, Cycling, and Outdoor Sports.
- **Dedicated Activity Explorer**: In-depth guidance per activity.
- **7-Day History Chart**: Interactive Recharts trend chart with weekly metrics (Best Day, Worst Day, Average AQI).
- **Dual API Integration**: Isolated API client (`lib/api.ts`) supporting live Python FastAPI prediction endpoints or deterministic development mock mode.

---

## 🚀 Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Build for Production
```bash
npm run build
npm start
```
