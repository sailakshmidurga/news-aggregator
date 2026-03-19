# News Aggregator (Performance Optimized)

## 📌 Overview

This project is a React-based News Aggregator application that fetches and displays top news articles. The application was initially implemented with performance issues and later optimized using modern frontend performance techniques.

---

## 🚀 Features

- Fetches top news articles
- Search functionality
- Sort articles by score
- Optimized rendering using virtualization
- Responsive UI
- Performance optimized version

---

## 🐢 Slow Version (Baseline)

The initial implementation had the following issues:

- Sequential API calls (N+1 problem)
- Large number of DOM elements
- No memoization
- Unoptimized image loading
- Poor scrolling performance

---

## ⚡ Optimized Version

The optimized version includes:

### ✅ Performance Improvements

- **Parallel API Calls**
  - Used `Promise.all` to fetch data concurrently

- **Reduced Network Load**
  - Limited number of articles fetched

- **List Virtualization**
  - Implemented using `@tanstack/react-virtual`
  - Reduced DOM nodes significantly

- **Memoization**
  - Used `useMemo` for filtering and sorting

- **Optimized Image**
  - Used WebP format
  - Added `width` and `height`
  - Implemented `srcset` for responsiveness
  - Used `fetchpriority="high"`

- **Efficient Rendering**
  - Deferred heavy operations to improve initial load

---

## 📊 Performance Results

| Metric | Before | After |
|--------|--------|-------|
| Performance Score | 33 | 57 |
| First Contentful Paint | 7.0s | 5.3s |
| Largest Contentful Paint | 10.2s | 8.4s |
| Total Blocking Time | 1410ms | 270ms |
| Cumulative Layout Shift | 0 | 0 |

---

## 🛠️ Tech Stack

- React
- JavaScript (ES6+)
- @tanstack/react-virtual
- Lodash

---

## 📁 Project Structure

```

news-aggregator/
│── public/
│   ├── hero.webp
│   ├── hero-small.webp
│
│── src/
│   ├── App.jsx
│   ├── main.jsx
│
│── Dockerfile
│── docker-compose.yml
│── .env.example
│── README.md
│── PERFORMANCE.md

````

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd news-aggregator
````

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Run Application

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 🐳 Docker Setup

### Build and Run

```bash
docker-compose up --build
```

### Access Application

Open:

```
http://localhost:3000
```

---

## 🌿 Branches

* **main** → Optimized implementation
* **slow-version** → Initial unoptimized version

---

## 📄 Additional Files

* `PERFORMANCE.md` → Detailed performance analysis
* `.env.example` → Environment variables template

---

## 🎯 Conclusion

The application performance was significantly improved by optimizing data fetching, reducing DOM size, and improving rendering efficiency. While some metrics depend on external API latency, the application follows best practices and meets all performance optimization requirements.

---

## 👨‍💻 Author

Your Name

Koneti Sai Lakshmi Durga.



