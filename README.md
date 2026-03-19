# News Aggregator (Slow Version)

## 📌 Overview

This is the initial unoptimized version of the News Aggregator application. It demonstrates common frontend performance issues and serves as a baseline for performance analysis.

---

## ⚠️ Performance Issues

The following issues are intentionally present in this version:

- **Sequential API Calls (N+1 Problem)**
  - Each article is fetched one after another
  - Causes significant delay in data loading

- **Excessive Network Requests**
  - Fetching large number of items (e.g., 500+)

- **No Virtualization**
  - Renders all articles in the DOM
  - Leads to heavy memory usage and slow rendering

- **No Memoization**
  - Filtering and sorting recompute on every render

- **Unoptimized Image**
  - Large image without optimization
  - No `srcset`, no size control

- **Poor Scrolling Performance**
  - Large DOM causes laggy scrolling

---

## 🧪 Expected Performance

When tested using Lighthouse:

- Performance Score: ~30–40
- High LCP (Largest Contentful Paint)
- High Total Blocking Time
- Poor responsiveness

---

## ⚙️ How to Run

### Install dependencies

```bash
npm install
````

### Start application

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 🎯 Purpose

This version is used to:

* Identify performance bottlenecks
* Compare before vs after optimization
* Demonstrate performance engineering techniques