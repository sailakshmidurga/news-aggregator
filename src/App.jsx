import { useEffect, useState, useMemo, useRef } from "react";
import sortBy from "lodash/sortBy";
import { useVirtualizer } from "@tanstack/react-virtual";

function App() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [sorted, setSorted] = useState(false);

  const parentRef = useRef();

  useEffect(() => {
    setTimeout(async () => {
      const res = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
      );
      const ids = await res.json();

      const promises = ids.slice(0, 20).map((id) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then((res) => res.json())
      );

      const data = await Promise.all(promises);
      setArticles(data);
    }, 100);
  }, []);

  const filtered = useMemo(() => {
    return articles.filter((a) =>
      a.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [articles, search]);

  const sortedArticles = useMemo(() => {
    return sorted ? sortBy(filtered, "score") : filtered;
  }, [filtered, sorted]);

  const rowVirtualizer = useVirtualizer({
    count: sortedArticles.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
  });

  const formatter = new Intl.DateTimeFormat();

  return (
    <div>
      {/* ✅ FINAL LCP FIXED IMAGE */}
      <img
        data-testid="hero-image"
        src="/hero.webp"
        srcSet="/hero-small.webp 480w, /hero.webp 800w"
        width="800"
        height="250"
        fetchpriority="high"
        style={{ width: "100%", height: "250px", objectFit: "cover" }}
      />

      <h1>News Aggregator</h1>

      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={() => setSorted(!sorted)}>
        Sort by Score
      </button>

      {articles.length === 0 ? (
        <p>Loading articles...</p>
      ) : (
        <div
          ref={parentRef}
          style={{ height: "500px", overflow: "auto" }}
          data-testid="article-list"
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const article = sortedArticles[virtualRow.index];
              if (!article) return null;

              return (
                <div
                  key={article.id}
                  data-testid="article-item"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualRow.start}px)`,
                    height: "200px",
                    padding: "10px",
                    borderBottom: "1px solid #ccc",
                    boxSizing: "border-box",
                  }}
                >
                  <h3>{article.title}</h3>
                  <p>By: {article.by}</p>
                  <p>Score: {article.score}</p>
                  <p>
                    {formatter.format(
                      new Date(article.time * 1000)
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;