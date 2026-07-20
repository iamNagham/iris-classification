import { useState } from "react";
import axios from "axios";
import "./App.css";
import History from "./History";
import Login from "./Login";
import Landing from "./Landing";
import { speciesInfo } from "./species";
 
function App() {
  const [sepalLength, setSepalLength] = useState("");
  const [sepalWidth, setSepalWidth] = useState("");
  const [petalLength, setPetalLength] = useState("");
  const [petalWidth, setPetalWidth] = useState("");
 
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 
  const [showHistory, setShowHistory] = useState(false);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("user_id") !== null);
  const [entered, setEntered] = useState(false);
 
  if (!entered) {
    return <Landing onEnter={() => setEntered(true)} />;
  }
 
  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} />;
  }
 
  const handlePredict = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        user_id: Number(localStorage.getItem("user_id")),
        sepal_length: sepalLength,
        sepal_width: sepalWidth,
        petal_length: petalLength,
        petal_width: petalWidth,
      });
 
      setResult(response.data);
    } catch (error) {
      setError("Prediction failed. Check your values and try again.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };
 
  const logout = () => {
    localStorage.removeItem("user_id");
    setLoggedIn(false);
  };
 
  if (showHistory) {
    return (
      <>
        <nav className="navbar">
          <h2>Iris —</h2>
          <div>
            <button onClick={() => setShowHistory(false)}>Home</button>
            <button onClick={logout}>Logout</button>
          </div>
        </nav>
        <History />
      </>
    );
  }
 
  const s = result ? speciesInfo(result.prediction) : null;
 
  return (
    <>
      <nav className="navbar">
        <h2>Iris —</h2>
        <div>
          <button onClick={() => setShowHistory(true)}>History</button>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
 
      <div className="container">
        <p className="eyebrow">Iris —</p>
        <h1>Species classifier</h1>
        
        <div className="card"> 
          <div className="group">
            <p className="group-title">Sepal</p>
            <div className="fields-grid">
              <div className="field">
                <label>Length</label>
                <div className="input-row">
                  <input type="number" step="0.1" value={sepalLength} onChange={(e) => setSepalLength(e.target.value)} />
                  <span className="unit">cm</span>
                </div>
              </div>
              <div className="field">
                <label>Width</label>
                <div className="input-row">
                  <input type="number" step="0.1" value={sepalWidth} onChange={(e) => setSepalWidth(e.target.value)} />
                  <span className="unit">cm</span>
                </div>
              </div>
            </div>
          </div>
 
          <div className="group">
            <p className="group-title">Petal</p>
            <div className="fields-grid">
              <div className="field">
                <label>Length</label>
                <div className="input-row">
                  <input type="number" step="0.1" value={petalLength} onChange={(e) => setPetalLength(e.target.value)} />
                  <span className="unit">cm</span>
                </div>
              </div>
              <div className="field">
                <label>Width</label>
                <div className="input-row">
                  <input type="number" step="0.1" value={petalWidth} onChange={(e) => setPetalWidth(e.target.value)} />
                  <span className="unit">cm</span>
                </div>
              </div>
            </div>
          </div>
 
          {error && (
            <p style={{ color: "var(--danger)", fontSize: 13, marginBottom: 14 }}>{error}</p>
          )}
 
          <button className="btn-primary" onClick={handlePredict} disabled={loading}>
            {loading ? "Identifying…" : "Identify species"}
          </button>
        </div>
 
        {result && (
          <div className="result-card">
            <div className="result-top">
              <div className="result-illustration">
                <img src={s.icon} alt={s.latin} width="56" height="56" />
              </div>
              <div>
                <p className="result-eyebrow">Predicted species</p>
                <p className="result-name">{s.latin}</p>
              </div>
            </div>
 
            <div className="certainty-label">
              <span>Certainty</span>
              <b>{(result.confidence * 100).toFixed(1)}%</b>
            
            </div>
            <div className="ticks">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="tick"
                  style={{
                    background: i < Math.round(result.confidence * 20) ? s.color : "var(--line)",
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
 
export default App;