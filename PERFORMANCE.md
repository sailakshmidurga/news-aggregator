## Baseline Performance Analysis

### Observations from Chrome DevTools Performance Panel

1. **Network Waterfall Issue**
- Observed a long continuous network activity spanning ~40 seconds.
- Indicates sequential API calls (N+1 problem).
- Each request waits for the previous one to complete.
- This significantly delays data availability.

2. **Main Thread Blocking**
- Total main thread time ~41 seconds.
- Continuous scripting and system tasks observed.
- Multiple long tasks present, blocking UI responsiveness.

3. **Excessive Re-rendering**
- Large number of small scripting blocks in flame chart.
- Caused by rendering 500 DOM nodes simultaneously.
- Filtering and sorting trigger full re-renders.

4. **Expensive Computations**
- Repeated date formatting (`toLocaleString`) visible in scripting time.
- Executed for every item on each render.

5. **Heavy Initial Load**
- Hero image contributes to rendering delay.
- No optimization applied.

---

### Key Issues Identified

| Issue | Impact |
|------|--------|
| Network Waterfall | Very slow data loading |
| No Virtualization | Large DOM, poor performance |
| Full Lodash Import | Increased bundle size |
| Expensive Computation | Increased scripting time |
| Unoptimized Image | Poor LCP |