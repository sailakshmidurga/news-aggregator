import { useEffect, useState } from "react";
import _ from "lodash";

function App() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [sorted, setSorted] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      const res = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
      );
      const ids = await res.json();

      let stories = [];

      //  VERY BAD: Sequential fetching (N+1 problem)
      for (let id of ids.slice(0, 500)) {
        const res = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        const data = await res.json();
        stories.push(data);
        console.log("Fetched:" , stories.length);
      }

      setArticles(stories);
    };

    fetchStories();
  }, []);

  // Filter
  let filtered = articles.filter((a) =>
    a.title?.toLowerCase().includes(search.toLowerCase())
  );

  // Sort
  if (sorted) {
    filtered = _.sortBy(filtered, "score"); //  full lodash
  }

  return (
    <div>
      <img
  src="/hero.jpg"
  style={{
    width: "100%",
    height: "400px",
    objectFit: "cover"
  }}
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

      <div>
        {filtered.map((a) => (
          <div key={a.id}>
            <h3>{a.title}</h3>
            <p>By: {a.by}</p>
            <p>Score: {a.score}</p>

            {/*  Expensive computation */}
            <p>{new Date(a.time * 1000).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;