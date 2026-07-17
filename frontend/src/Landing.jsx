function Landing({ onEnter }) {
  return (
    <div className="auth-container">
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <p className="eyebrow" style={{ textAlign: "center" }}>
          Iris —
        </p>
        <h1 style={{ fontSize: 44, lineHeight: 1.15 }}>
          Four measurements.
          <br />
          One identified species.
        </h1>
        <p className="sub" style={{ margin: "16px auto 32px", textAlign: "center" }}>
          Enter four simple flower measurements and let the model instantly classify the iris species with confidence. 
          Every prediction is securely saved to your personal history.
        </p>
        <button className="btn-primary" style={{ width: "auto", padding: "13px 32px" }} onClick={onEnter}>
          Identify an Iris → 
        </button>
      </div>
    </div>
  );
}
 
export default Landing;