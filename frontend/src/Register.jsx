import { useState } from "react";
import axios from "axios";
 
function Register({ setShowRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 
  const handleRegister = async () => {
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
 
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
 
    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:5000/register", {
        email,
        password,
      });
 
      setShowRegister(false);
    } catch (error) {
      setError("That email is already registered.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="auth-container">
      <div className="auth-card">
        <p className="eyebrow" style={{ textAlign: "center" }}>
          Iris —
        </p>
        <h1>Specimen classifier</h1>
        <h2>Create an account</h2>
 
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
 
        <button className="btn-primary" onClick={handleRegister} disabled={loading}>
          {loading ? "Creating…" : "Register"}
        </button>
 
        <button className="secondary-btn" onClick={() => setShowRegister(false)}>
          Back to sign in
        </button>
      </div>
    </div>
  );
}

export default Register;