# Iris Flower Classifier

## Overview

This project is an Iris Flower Classification system built using Machine Learning, Flask, and React.

The user enters flower measurements through a React frontend. The data is sent to a Flask API, which loads a trained Decision Tree model and returns the predicted flower species with a confidence score.

---

## Features

- Train a Decision Tree classifier using the Iris dataset.
- Evaluate model performance using Accuracy Score and Confusion Matrix.
- Save the trained model using Joblib.
- Flask REST API for predictions.
- React user interface for entering flower measurements.
- Display prediction results and confidence score.

---

## Technologies Used

- Python
- Scikit-learn
- Flask
- Flask-CORS
- React.js
- Joblib

---

## Install Required Libraries

### Backend Dependencies

Install the required Python libraries:

```bash
pip install flask flask-cors scikit-learn pandas joblib
```

### Frontend Dependencies

Install the required React packages:

```bash
npm install
npm install axios
```

## How to Run the Project

### 1. Run the Backend

Open a terminal inside the backend folder:

```bash
cd Backend
python app.py
```

The Flask server will start on:

```text
http://127.0.0.1:5000
```

---

### 2. Run the Frontend

Open a second terminal inside the React project folder:

```bash
npm install
npm run dev
```

The React application will start on:

```text
http://localhost:5173
```

---

## API Endpoint

### POST /predict

Example Request:

```json
{
  "sepal_length": 5.1,
  "sepal_width": 3.5,
  "petal_length": 1.4,
  "petal_width": 0.2
}
```

Example Response:

```json
{
  "prediction": "setosa",
  "Confidence": 1.0
}
```
