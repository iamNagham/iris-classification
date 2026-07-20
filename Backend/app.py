#import libraries
from flask import Flask,request,jsonify, g, current_app
import joblib
from flask_cors import CORS
import sqlite3
from app2 import db, Prediction


#Create flask application
app=Flask(__name__)
#Load trained ML model
model = joblib.load("Trained_model.pkl")
#Enable CORS to allow communication with React frontend
CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
#Prediction endpoint
@app.route('/predict',methods=['POST'])

def predict():
    #Get input data sent by the frontend
    data=request.json

    #Arrange inputs
    features = [[
        data["sepal_length"],
        data["sepal_width"],
        data["petal_length"],
        data["petal_width"]
    ]]

    #Generate prediction using trained model
    prediction = model.predict(features)[0]

    #Map numeric class label to flower names
    flower_names = {
    0: "setosa",
    1: "versicolor",
    2: "virginica"
    }

    #Calculate prediction confidence score
    confidence = model.predict_proba(features)[0]
    confidence_score = confidence[prediction]
    print(confidence)

    record = Prediction(
        sepal_length=data['sepal_length'],
        sepal_width=data['sepal_width'],
        petal_length=data['petal_length'],
        petal_width=data['petal_width'],
        predicted_class=prediction,
        confidence=confidence
    )

    db.session.add(record)
    db.session.commit()


    #Return prediction result as JSON response
    return jsonify({
    "prediction": flower_names[prediction],
    "Confidence": float(confidence_score)
    })


#Run flask development server
if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)