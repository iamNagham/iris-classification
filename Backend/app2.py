from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    email = db.Column(db.String(255),unique=True,nullable=False)
    password = db.Column(db.String(255),nullable=False)
    created_at = db.Column(db.DateTime,default=datetime.utcnow)
    predictions = db.relationship('Prediction',backref='user',lazy=True)


class Prediction(db.Model):

    id = db.Column(db.Integer,primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    sepal_length = db.Column(db.Float,nullable=False)
    sepal_width = db.Column(db.Float,nullable=False)
    petal_length = db.Column(db.Float,nullable=False)
    petal_width = db.Column(db.Float,nullable=False)
    predicted_class = db.Column(db.String(50),nullable=False)
    confidence = db.Column(db.Float,nullable=False)
    created_at = db.Column(db.DateTime,default=datetime.utcnow)

    