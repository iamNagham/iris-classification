#Library imports
from sklearn.datasets import load_iris
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, confusion_matrix
import joblib

#Load dataset
iris = load_iris()

#Turn data into a dataframe
data=pd.DataFrame(
    iris.data,
    columns=iris.feature_names
)


print(data.head())
print(iris.keys())
print(iris.target_names)

#Data exploration
print("-Data Shape:")
print(data.shape)
print("-Class Distribution:")
print(pd.Series(iris.target).value_counts())
print("-Missing Values:")
print(data.isnull().sum())

x=iris.data
y=iris.target

#Splitting data into testing and training
x_train, x_test, y_train, y_test = train_test_split (x, y, test_size=0.2, random_state=42, stratify=y)

#Model Training
dt_clf = DecisionTreeClassifier( criterion="gini", max_depth=3, random_state=42)
dt_clf.fit(x_train, y_train)
y_pred_dt = dt_clf.predict(x_test)
acc_dt = accuracy_score(y_test, y_pred_dt)
cm=confusion_matrix(y_test,y_pred_dt)
print ("Decision Tree Accuracy:", acc_dt)
print("Decision Tree Confusion Matrix: \n", cm)

#Saving model
joblib.dump(dt_clf,'Trained_model.pkl')