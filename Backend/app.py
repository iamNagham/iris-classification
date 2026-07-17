#import libraries
from flask import Flask,request,jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import joblib
from flask_cors import CORS
from app2 import db, Prediction, User
from dotenv import load_dotenv
import os


#Create flask application
app=Flask(__name__)
#Load trained ML model
model = joblib.load("Trained_model.pkl")
#Enable CORS to allow communication with React frontend
CORS(app)

load_dotenv("database.env")

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DB_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
#Prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():

    data = request.get_json()

    features = [[
        float(data["sepal_length"]),
        float(data["sepal_width"]),
        float(data["petal_length"]),
        float(data["petal_width"])
    ]]

    prediction = model.predict(features)[0]
    proba = model.predict_proba(features)[0]

    flower_names = ["setosa", "versicolor", "virginica"]

    predicted_label = flower_names[int(prediction)]
    confidence_score = float(proba[int(prediction)])

    record = Prediction(
        user_id=data["user_id"],
        sepal_length=float(features[0][0]),
        sepal_width=float(features[0][1]),
        petal_length=float(features[0][2]),
        petal_width=float(features[0][3]),
        predicted_class=str(predicted_label),
        confidence=float(confidence_score)
    )

    db.session.add(record)
    db.session.commit()

    return jsonify({
        "prediction": predicted_label,
        "confidence": confidence_score
    })

@app.route('/history/<int:user_id>', methods=['GET'])
def history(user_id):

    predictions = Prediction.query.filter_by(user_id=user_id).all()

    history = []

    for p in predictions:
        history.append({
            "prediction": p.predicted_class,
            "confidence": p.confidence,
            "sepal_length": p.sepal_length,
            "sepal_width": p.sepal_width,
            "petal_length": p.petal_length,
            "petal_width": p.petal_width,
            "date": p.created_at
        })

    return jsonify(history)

@app.route('/register', methods=['POST'])
def register():

    data = request.get_json()

    email = data["email"]
    password = data["password"]

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({
            "message":"User already exists"
        }),400


    user = User(
    email=email,
    password=generate_password_hash(password)
    )

    db.session.add(user)
    db.session.commit()


    return jsonify({
        "message":"User created successfully",
        "user_id": user.id
    })


@app.route('/login', methods=['POST'])
def login():

    data = request.get_json()

    user = User.query.filter_by(
        email=data["email"]
    ).first()


    if not user or not check_password_hash(
        user.password,
        data["password"]
    ):
        return jsonify({
            "message":"Invalid credentials"
        }),401


    return jsonify({
        "user_id": user.id
    })


#Run flask development server
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
