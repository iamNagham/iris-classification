import { useEffect, useState } from "react";
import axios from "axios";
import { speciesInfo } from "./species";
 
function History() {
  const [history, setHistory] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 
  useEffect(() => {
    const getHistory = async () => {
      const user_id = localStorage.getItem("user_id");
      try {
        const response = await axios.get(`http://127.0.0.1:5000/history/${user_id}`);
        setHistory(response.data);
      } catch (err) {
        setError("Couldn't load history right now.");
      } finally {
        setLoading(false);
      }
    };
 
    getHistory();
  }, []);
 
  const formatDate = (value) => {
    if (!value) return "";
    const d = new Date(value);
    return isNaN(d) ? value : d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  };
 
  return (
    <div className="container">
      <h2 className="history-title">Recent predictions</h2>
 
      {loading && <p className="sub">Loading history…</p>}
      {error && <p className="sub" style={{ color: "var(--danger)" }}>{error}</p>}
 
      {!loading && !error && history.length === 0 && (
        <div className="empty-state">No specimens identified yet. Run a prediction to see it here.</div>
      )}
 
      {history.map((item, index) => {
        const s = speciesInfo(item.prediction);
        // confidence is stored 0–1 by the API; guard in case it's already a percentage
        const confPct = item.confidence <= 1 ? item.confidence * 100 : item.confidence;
 
        return (
          <div className="history-card" key={index}>
            <div className="history-header" onClick={() => setExpanded(expanded === index ? null : index)}>
              <div className="prediction-name">
                <span className="species-dot" style={{ background: s.color }} />
                <span>{s.latin}</span>
              </div>
 
              <div className="history-info">
                <span>{confPct.toFixed(1)}%</span>
                <span>{formatDate(item.date)}</span>
                <span className="arrow">{expanded === index ? "▲" : "▼"}</span>
              </div>
            </div>
 
            {expanded === index && (
              <div className="history-details">
                <div className="detail"><strong>Sepal length</strong> — {item.sepal_length} cm</div>
                <div className="detail"><strong>Sepal width</strong> — {item.sepal_width} cm</div>
                <div className="detail"><strong>Petal length</strong> — {item.petal_length} cm</div>
                <div className="detail"><strong>Petal width</strong> — {item.petal_width} cm</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
 
export default History;