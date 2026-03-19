# Performance Report (Baseline - Slow Version)

## Lighthouse Metrics

| Metric | Score |
|--------|------|
| Performance Score | 33 |
| First Contentful Paint (FCP) | 7.0s |
| Largest Contentful Paint (LCP) | 10.2s |
| Total Blocking Time (TBT) | 1410ms |
| Cumulative Layout Shift (CLS) | 0 |

---

## Analysis of Metrics

- Very poor performance score (33) indicates significant performance issues.
- High LCP (10.2s) due to large unoptimized hero image and slow data loading.
- High TBT (1410ms) indicates main thread blocking caused by rendering 500 items and expensive computations.
- High FCP (7.0s) due to delayed content rendering from sequential API calls.
- CLS is currently low because layout shifts are minimal, but lack of image dimensions can cause instability in other scenarios.

---

## Observations

### 1. Network Waterfall
- 500 API requests executed sequentially.
- Large delay in data loading (~30–40 seconds).
- Caused by loop with await inside.

### 2. Large DOM Size
- Rendering 500+ articles at once.
- Increases memory usage and slows rendering.

### 3. Expensive Computation
- `toLocaleString()` runs for each item on every render.
- Increases scripting time.

### 4. Unoptimized Image
- Large hero image without optimization.
- Affects LCP significantly.

### 5. Heavy JavaScript Execution
- Full lodash library is imported.
- Increases bundle size and parsing time.

---

## Root Cause Analysis

| Issue | Cause |
|------|------|
| Slow loading | Sequential API calls (network waterfall) |
| High LCP | Large unoptimized hero image |
| High TBT | Rendering 500 items + expensive computations |
| High FCP | Delayed initial rendering |
| Large bundle size | Full lodash import |

---

## Proposed Solutions

| Issue | Solution |
|------|---------|
| Network waterfall | Use Promise.all for parallel API requests |
| Large DOM size | Implement list virtualization |
| Expensive computation | Use useMemo or reuse formatter |
| Image issue | Compress image, use WebP, add width/height/srcset |
| Bundle size | Use modular lodash imports |

---

## Chrome DevTools Analysis

- Observed long main thread activity (~40 seconds).
- Sequential network requests clearly visible in the performance timeline.
- Multiple scripting blocks due to repeated rendering and filtering.
- UI becomes unresponsive during interactions like typing and sorting.