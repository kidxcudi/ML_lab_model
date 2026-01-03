# ML_lab_model
---
# 💬 Toxic Speech Detection

**Toxic Speech Detection** is an AI-powered web application that classifies text messages as **toxic** or **non-toxic** using a **Logistic Regression** machine learning model. It provides real-time analysis with probabilities and highlights the likelihood of toxic content.

---

## 🚀 Features

* **Binary classification**: Toxic vs Non-Toxic
* **Probability scores** for each class
* **Real-time predictions** via a web interface
* **Batch predictions** support
* **API metadata** and model information endpoints
* **Accessible and responsive** UI

---

## 🧪 Frontend

**Technology:** React + Lucide React icons + CSS

### Key Functionalities:

* **Text input** for single message analysis
* **Batch input** for multiple messages
* **Prediction display**:

  * Toxic or Non-Toxic label
  * Confidence score
  * Probability distribution
* **Error handling** and loading indicators
* **Responsive layout** for mobile and desktop

---

## ⚡ Backend

**Technology:** FastAPI + Python + Joblib

### API Endpoints:

| Endpoint                  | Method | Description                            |
| ------------------------- | ------ | -------------------------------------- |
| `/api/predict`            | POST   | Predict if a message is toxic          |
| `/api/predict/batch`      | POST   | Batch prediction for multiple messages |
| `/api/info`               | GET    | Get model metadata and statistics      |
| `/api/health`             | GET    | Server health check                    |
| `/api/feature-importance` | GET    | Get top predictive words/features      |

### Model

* **Algorithm:** Logistic Regression
* **Features:** TF-IDF vectorized text
* **Performance Metrics:** Accuracy, Precision, Recall, F1-score
* **Top Features:** Most predictive words contributing to toxicity

---

## 🛠️ Installation

### Backend

```bash
git clone <repo-url>
cd backend
pip install -r requirements.txt

# Run server
uvicorn main:app --reload
```

* API available at: `http://127.0.0.1:8000`
* API docs: `http://127.0.0.1:8000/docs`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

* App runs on `http://localhost:3000`

> ⚠️ Make sure the backend is running before using the frontend.

---

## 🎯 Usage

1. Enter a text message or a batch of messages.
2. Click **Predict Toxicity**.
3. View:

   * **Predicted class**: Toxic or Non-Toxic
   * **Confidence score** (0–100%)
   * **Top contributing words** (from feature importance)

---

## 📊 Example Input (JSON)

```json
{
  "text": "You are so stupid!"
}
```

---

## 📈 Sample Output (JSON)

```json
{
  "prediction": "Toxic",
  "confidence": 0.92,
  "probabilities": {
    "Toxic": 0.92,
    "Non-Toxic": 0.08
  },
  "top_features": [
    {"word": "stupid", "weight": 1.45},
    {"word": "idiot", "weight": 1.22},
    {"word": "hate", "weight": 1.10}
  ]
}
```

---

## 🌟 Why This Project

* Demonstrates **text classification** with logistic regression
* Shows **full-stack ML deployment** (React + FastAPI)
* Provides **explainable predictions** using feature importance
* Useful as a **portfolio project** for NLP and machine learning

Do you want me to do that?

