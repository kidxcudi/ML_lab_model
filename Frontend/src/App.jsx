import { useState } from "react";
import "./App.css";

const App = () => {
  const [comment, setComment] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const predict = async () => {
    if (!comment.trim()) {
      alert("Please enter a comment before predicting.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("https://ml-lab-model.onrender.com/predict", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ comment_text: comment })
      });

      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

      const data = await res.json();
      setResult(data);

    } catch (err) {
      console.error("Prediction error:", err);
      setResult({
        label: "Error",
        prediction: null,
        error: "Unable to connect to backend. Make sure FastAPI is running!"
      });
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === "Enter") predict();
  };

  // ADD THIS FUNCTION - IT WAS MISSING!
  const handleClear = () => {
    setComment("");
    setResult(null);
  };

  const isToxic = result?.prediction === 1;

  return (
    <div className="app dark-mode">
      <div className="container">

        {/* Header */}
        <div className="header">
          <div className="app-info">
            <h1>🔍 Toxic Comment Detection</h1>
            <p>Enter a comment to check for toxic content</p>
          </div>
        </div>

        {/* Main */}
        <div className="main-content">
          <div className="input-card">
            <div className="card-header">
              <h2 className="card-title">Comment Analyzer</h2>
            </div>

            <div className="input-area">
              <div className="input-label">
                <span className="label-text">Enter your comment</span>
              </div>

              <div className="textarea-wrapper">
                <textarea
                  className="comment-input"
                  rows={7}
                  placeholder="Type a comment here..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                />
                <div className="char-count">
                  <span>{comment.length}/500</span>
                </div>
              </div>

              <div className="input-actions">
                <div className="shortcut-hint">
                  <span className="hint-icon">⌨️</span>
                  <span className="hint-text">Ctrl + Enter to analyze</span>
                </div>

                <div className="action-buttons">
                  <button 
                    className="clear-btn"
                    onClick={handleClear} // Now this works!
                    disabled={loading || (!comment.trim() && !result)}
                  >
                    <span className="btn-icon">🗑️</span>
                    Clear
                  </button>

                  <button
                    className={`analyze-btn ${loading ? "loading" : ""}`}
                    onClick={predict}
                    disabled={loading || comment.length < 5}
                  >
                    {loading ? (
                      <>
                        <div className="spinner"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        🔍 Analyze
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RESULTS */}
          {result && (
            <div className={`results-card ${isToxic ? "toxic" : "safe"}`}>
              <div className="results-header">
                <div className={`result-icon ${isToxic ? "toxic-icon" : "safe-icon"}`}>
                  {isToxic ? "⚠️" : "✅"}
                </div>

                <div className="result-title-section">
                  <h3>
                    {isToxic ? "Toxic Content Detected!" : "Content is Safe!"}
                  </h3>
                  <p>
                    {isToxic
                      ? "This comment contains harmful or inappropriate language."
                      : "This comment appears respectful and appropriate."}
                  </p>
                </div>
              </div>

              <div className="results-details">
                <p><strong>Classification:</strong> {result.label}</p>

                {result.confidence !== null && (
                  <p>
                    <strong>Confidence:</strong> {(result.confidence * 100).toFixed(1)}%
                  </p>
                )}

                {result.error && (
                  <div className="error-card">
                    🚨 {result.error}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
