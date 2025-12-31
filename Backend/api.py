from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import json
import os

app = FastAPI(
    title="Toxic Comment Detection API",
    description="Logistic Regression Model API",
    version="1.0"
)

# ====== CORS (IMPORTANT) ======
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       # you can restrict later if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ====== Load Model ======
MODEL_DIR = "Model/toxic_model_bundle"
MODEL_PATH = os.path.join(MODEL_DIR, "model.joblib")
SCHEMA_PATH = os.path.join(MODEL_DIR, "schema.json")

model = joblib.load(MODEL_PATH)

with open(SCHEMA_PATH, "r") as f:
    schema = json.load(f)

required_cols = schema["required_columns"]

class Comment(BaseModel):
    comment_text: str

@app.get("/")
def root():
    return {"message": "Toxic Comment API Running"}

@app.post("/predict")
def predict(data: Comment):
    df = pd.DataFrame([{ "comment_text": data.comment_text }])
    pred = model.predict(df)[0]
    pred_prob = model.predict_proba(df)[0]  # <-- get probabilities

    label = "Toxic" if pred == 1 else "Non-Toxic"
    confidence = float(pred_prob[pred])  # probability for the predicted class

    return {
        "input": data.comment_text,
        "prediction": int(pred),
        "label": label,
        "confidence": confidence
    }
