import { useState } from "react";
import axios from "axios";
import Register from "./Register";
 
function Login({ setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 
  const handleLogin = async () => {
    setError("");
 
    if (!email.trim() && !password.trim()) {
      setError("Please enter both fields.");
      return;
    }
 
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
 
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }
 
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        email,
        password,
      });
 
      localStorage.setItem("user_id", response.data.user_id);
      setLoggedIn(true);
    } catch (error) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };
 
  if (showRegister) {
    return <Register setShowRegister={setShowRegister} />;
  }
 
  return (
    <div className="auth-container">
      <div className="auth-card">
        <p className="eyebrow" style={{ textAlign: "center" }}>
          Iris —
        </p>
        <h1>Species classifier</h1>
        <h2>Sign in to continue</h2>
 
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
 
        {error && (
          <p style={{ color: "var(--danger)", fontSize: 13, marginTop: -8, marginBottom: 14 }}>
            {error}
          </p>
        )}
 
        <button className="btn-primary" onClick={handleLogin} disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
 
        <p>Don't have an account?</p>
 
        <button className="secondary-btn" onClick={() => setShowRegister(true)}>
          Create account
        </button>
      </div>
    </div>
  );
}
 
export default Login;